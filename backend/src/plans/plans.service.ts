import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { Logger } from '@nestjs/common';

@Injectable()
export class PlansService {
  private readonly logger = new Logger(PlansService.name);
  private stripe: any;

  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {
    this.stripe = new Stripe(this.config.get<string>('STRIPE_SECRET_KEY')!, {
      apiVersion: '2024-06-20' as any,
    });
  }

  async findAll() {
    return this.prisma.plan.findMany({ where: { active: true }, orderBy: { monthlyPrice: 'asc' } });
  }

  async create(data: any) {
    return this.prisma.plan.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.plan.update({ where: { id }, data });
  }

  async subscribeTenant(tenantId: string, planId: string) {
    if (this.config.get('DEV_MODE') === 'true') {
      this.logger.log(`[DEV_MODE] Bypass: Inscrição de plano para tenant ${tenantId} ignorando Stripe.`);
      return this.prisma.tenant.update({
        where: { id: tenantId },
        data: { planId, subscriptionId: 'sub_dev_mode_12345' },
      });
    }

    const plan = await this.prisma.plan.findUnique({ where: { id: planId } });
    if (!plan) throw new Error('Plano não encontrado');

    const tenant = await this.prisma.tenant.findUnique({ where: { id: tenantId } });
    if (!tenant) throw new Error('Barbearia não encontrada');

    // Se o plano tem Stripe Price ID, criar assinatura Stripe
    if (plan.stripePriceId && tenant.stripeCustomerId) {
      const subscription = await this.stripe.subscriptions.create({
        customer: tenant.stripeCustomerId,
        items: [{ price: plan.stripePriceId }],
      });

      await this.prisma.tenant.update({
        where: { id: tenantId },
        data: { planId, subscriptionId: subscription.id },
      });

      return subscription;
    }

    // Sem Stripe, apenas vincular plano
    return this.prisma.tenant.update({
      where: { id: tenantId },
      data: { planId },
    });
  }

  // ── Cron Job — Verifica Inadimplência ─────────────────────────────────────
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async checkDelinquency() {
    this.logger.log('🔄 Verificando inadimplência dos tenants...');

    const tenantsWithSubs = await this.prisma.tenant.findMany({
      where: {
        subscriptionId: { not: null },
        status: 'ACTIVE',
      },
    });

    for (const tenant of tenantsWithSubs) {
      try {
        const sub = await this.stripe.subscriptions.retrieve(tenant.subscriptionId!);

        if (sub.status === 'past_due' || sub.status === 'unpaid' || sub.status === 'canceled') {
          await this.prisma.tenant.update({
            where: { id: tenant.id },
            data: { status: 'DELINQUENT' },
          });
          this.logger.warn(`Tenant ${tenant.slug} marcado como DELINQUENT`);
        } else if (sub.status === 'active' && tenant.status === 'DELINQUENT') {
          // Regularizou
          await this.prisma.tenant.update({
            where: { id: tenant.id },
            data: { status: 'ACTIVE' },
          });
          this.logger.log(`Tenant ${tenant.slug} reativado`);
        }
      } catch (error) {
        this.logger.error(`Erro ao verificar tenant ${tenant.slug}: ${error}`);
      }
    }

    this.logger.log('✅ Verificação de inadimplência concluída');
  }
}
