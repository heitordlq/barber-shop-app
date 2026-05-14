import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { phoneDigitsForApi } from '@barbearia/phone-br';
import { PrismaService } from '../prisma/prisma.service';
import { TenantPrismaFactory } from '../prisma/tenant-prisma.factory';
import { CreateLoyaltyPlanDto, UpdateLoyaltyPlanDto, IdentifyClientDto, ManualSubscriptionDto } from './dto/loyalty.dto';
import { addDays, addMonths, addYears } from 'date-fns';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class LoyaltyService {
  constructor(
    private prisma: PrismaService,
    private tenantFactory: TenantPrismaFactory,
  ) {}

  /** Match exato ou, para telefone, apenas dígitos (máscara no app vs valor no banco). */
  private async findBackofficeClientByIdentifyDto(dto: IdentifyClientDto) {
    type Row = { id: string; name: string; email: string | null; phone: string | null };
    const email = dto.email?.trim();
    const phoneTrim = dto.phone?.trim();
    const orClause = [
      email ? { email } : null,
      phoneTrim ? { phone: phoneTrim } : null,
    ].filter(Boolean) as { email?: string; phone?: string }[];

    if (!orClause.length) return null;

    let user: Row | null = (await this.prisma.user.findFirst({
      where: { role: 'CLIENT', OR: orClause },
      select: { id: true, name: true, email: true, phone: true },
    })) as Row | null;

    if (!user && phoneTrim) {
      const want = phoneDigitsForApi(phoneTrim);
      if (want.length >= 10) {
        const rows = await this.prisma.$queryRaw<Row[]>(Prisma.sql`
          SELECT id, name, email, phone
          FROM users
          WHERE role = 'CLIENT'
            AND phone IS NOT NULL
            AND regexp_replace(phone, '[^0-9]', '', 'g') = ${want}
          LIMIT 1
        `);
        user = rows[0] ?? null;
      }
    }

    return user;
  }

  private async assertBarberBelongsToTenant(barberId: string, tenantId: string) {
    const barber = await this.prisma.user.findFirst({
      where: { id: barberId, tenantId, role: { in: ['OWNER', 'BARBER'] }, blocked: false },
      select: { id: true },
    });
    if (!barber) throw new BadRequestException('Barbeiro inválido para este tenant');
  }

  // ── Planos ───────────────────────────────────────────────────────────────

  async createPlan(tenantId: string, tenantSlug: string, dto: CreateLoyaltyPlanDto) {
    const db = this.tenantFactory.getClient(tenantSlug);
    return db.loyaltyPlan.create({
      data: {
        tenantId,
        name: dto.name,
        description: dto.description,
        price: dto.price,
        interval: dto.interval,
        items: {
          create: dto.items.map((item) => ({
            serviceId: item.serviceId,
            quantity: item.quantity,
            allowedDays: item.allowedDays,
          })),
        },
      },
      include: { items: { include: { service: true } } },
    });
  }

  async findAllPlans(tenantId: string, tenantSlug: string) {
    const db = this.tenantFactory.getClient(tenantSlug);
    return db.loyaltyPlan.findMany({
      where: { tenantId, active: true },
      include: { items: { include: { service: true } } },
    });
  }

  async updatePlan(id: string, tenantId: string, tenantSlug: string, dto: UpdateLoyaltyPlanDto) {
    const db = this.tenantFactory.getClient(tenantSlug);
    const plan = await db.loyaltyPlan.findFirst({ where: { id, tenantId } });
    if (!plan) throw new NotFoundException('Plano não encontrado');

    return db.loyaltyPlan.update({
      where: { id },
      data: {
        name: dto.name,
        description: dto.description,
        price: dto.price,
        interval: dto.interval,
        items: dto.items
          ? {
              deleteMany: {},
              create: dto.items.map((item) => ({
                serviceId: item.serviceId,
                quantity: item.quantity,
                allowedDays: item.allowedDays,
              })),
            }
          : undefined,
      },
      include: { items: { include: { service: true } } },
    });
  }

  async deletePlan(id: string, tenantId: string, tenantSlug: string) {
    const db = this.tenantFactory.getClient(tenantSlug);
    const plan = await db.loyaltyPlan.findFirst({ where: { id, tenantId } });
    if (!plan) throw new NotFoundException('Plano não encontrado');
    return db.loyaltyPlan.update({ where: { id }, data: { active: false } });
  }

  // ── Identificação de Cliente ──────────────────────────────────────────────

  async identifyClient(dto: IdentifyClientDto) {
    if (!dto.email && !dto.phone) {
      throw new BadRequestException('Informe email ou telefone para identificação');
    }

    const user = await this.findBackofficeClientByIdentifyDto(dto);

    if (!user) return null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      subscriptions: [],  // Admin view — subscriptions require tenant context
    };
  }

  /** Identificação na página pública da barbearia: assinaturas ativas só deste tenant. */
  async identifyClientForTenant(
    tenantId: string,
    tenantSlug: string,
    dto: IdentifyClientDto,
    barberIdFromQuery?: string,
  ) {
    if (!dto.email?.trim() && !dto.phone?.trim()) {
      return { identified: false as const, subscriptions: [] };
    }

    const user = await this.findBackofficeClientByIdentifyDto({
      email: dto.email?.trim(),
      phone: dto.phone?.trim(),
    });

    if (!user) {
      return { identified: false as const, subscriptions: [] };
    }

    const tenant = await this.prisma.tenant.findUnique({
      where: { id: tenantId },
      select: { separateCashRegisterEnabled: true },
    });
    const separate = !!tenant?.separateCashRegisterEnabled;

    // Find subscriptions in tenant schema
    const db = this.tenantFactory.getClient(tenantSlug);
    const barberFilter =
      separate && barberIdFromQuery ? { barberId: barberIdFromQuery } : {};

    const loyaltySubscriptions = await db.loyaltySubscription.findMany({
      where: {
        userId: user.id,
        status: 'ACTIVE',
        plan: { tenantId, active: true },
        ...barberFilter,
      },
      include: {
        plan: {
          include: {
            items: { include: { service: true } },
          },
        },
        usages: {
          include: {
            appointment: { select: { serviceId: true } },
          },
        },
      },
    });

    const now = new Date();
    const activeSubs = loyaltySubscriptions.filter((sub) => {
      if (!sub.endDate) return true;
      return new Date(sub.endDate) > now;
    });

    const subscriptions = activeSubs.map((sub) => ({
      id: sub.id,
      planId: sub.planId,
      planName: sub.plan.name,
      barberId: (sub as any).barberId ?? null,
      endDate: sub.endDate,
      interval: sub.plan.interval,
      items: sub.plan.items.map((item) => {
        const usedCount = sub.usages.filter(
          (u) => u.appointment?.serviceId === item.serviceId,
        ).length;
        const quantity = item.quantity;
        return {
          planItemId: item.id,
          serviceId: item.serviceId,
          serviceName: item.service?.name ?? 'Serviço',
          quantity,
          usedCount,
          remaining: Math.max(0, quantity - usedCount),
        };
      }),
    }));

    return { identified: true as const, userId: user.id, name: user.name, subscriptions };
  }

  async createManualSubscription(
    tenantId: string,
    tenantSlug: string,
    dto: ManualSubscriptionDto,
    actor?: { sub: string; role: string },
  ) {
    const db = this.tenantFactory.getClient(tenantSlug);

    const plan = await db.loyaltyPlan.findFirst({ where: { id: dto.planId, tenantId } });
    if (!plan) throw new NotFoundException('Plano não encontrado');

    const tenant = await this.prisma.tenant.findUnique({
      where: { id: tenantId },
      select: { separateCashRegisterEnabled: true },
    });
    const separate = !!tenant?.separateCashRegisterEnabled;

    const rawPhone = dto.phone?.trim() ?? '';
    const phoneNorm = rawPhone ? phoneDigitsForApi(dto.phone) : '';
    const phoneVariants = rawPhone ? [...new Set([rawPhone, phoneNorm].filter((x) => x.length > 0))] : [];

    // Find or create user in backoffice
    let user = await this.prisma.user.findFirst({
      where: {
        AND: [
          {
            OR: [
              dto.email ? { email: dto.email } : undefined,
              ...phoneVariants.map((p) => ({ phone: p })),
            ].filter(Boolean) as any,
          },
          { OR: [{ tenantId }, { tenantId: null }] },
        ],
      },
    });

    if (!user) {
      if (!dto.name || (!dto.email && !dto.phone)) {
        throw new BadRequestException('Dados incompletos para criar novo cliente');
      }
      const dummyPassword = await bcrypt.hash(Math.random().toString(36), 10);
      user = await this.prisma.user.create({
        data: {
          name: dto.name,
          email: dto.email || `${Date.now()}@placeholder.com`,
          phone: phoneNorm || null,
          password: dummyPassword,
          role: 'CLIENT',
          tenantId,
          tenantSlug,
        },
      });
    } else {
      if (!user.tenantId) {
        user = await this.prisma.user.update({
          where: { id: user.id },
          data: { tenantId, tenantSlug },
        });
      } else if (user.tenantId !== tenantId) {
        throw new BadRequestException('Este cliente já pertence a outra barbearia');
      }
    }

    let resolvedBarberId: string | null = null;
    if (separate) {
      if (actor?.role === 'BARBER') {
        resolvedBarberId = actor.sub;
      } else if (actor?.role === 'OWNER') {
        if (!dto.barberId) {
          throw new BadRequestException('Informe o barbeiro responsável pela assinatura (caixa separado).');
        }
        await this.assertBarberBelongsToTenant(dto.barberId, tenantId);
        resolvedBarberId = dto.barberId;
      } else {
        // fluxo público (sem actor): exige barberId no body
        if (!dto.barberId) {
          throw new BadRequestException('Informe o profissional para vincular esta assinatura (caixa separado).');
        }
        await this.assertBarberBelongsToTenant(dto.barberId, tenantId);
        resolvedBarberId = dto.barberId;
      }
    } else {
      resolvedBarberId = null;
    }

    const nowCheck = new Date();
    const activeSamePlan = await db.loyaltySubscription.findFirst({
      where: {
        userId: user!.id,
        planId: plan.id,
        status: 'ACTIVE',
        OR: [{ endDate: null }, { endDate: { gt: nowCheck } }],
        ...(separate ? { barberId: resolvedBarberId } : {}),
      },
    });
    if (activeSamePlan) {
      throw new BadRequestException('Você já possui uma assinatura ativa neste plano.');
    }

    let endDate: Date;
    const start = new Date();
    if (plan.interval === 'WEEKLY') endDate = addDays(start, 7);
    else if (plan.interval === 'MONTHLY') endDate = addMonths(start, 1);
    else endDate = addYears(start, 1);

    const sub = await db.loyaltySubscription.create({
      data: {
        planId: plan.id,
        userId: user!.id,
        barberId: resolvedBarberId,
        status: 'ACTIVE',
        startDate: start,
        endDate,
      },
    });

    await db.transaction.create({
      data: {
        tenantId,
        type: 'INCOME',
        amount: plan.price,
        description: `Assinatura: ${plan.name} (${user?.name})`,
        date: start,
        barberId: resolvedBarberId,
      },
    });

    return sub;
  }

  async findAllSubscriptions(
    tenantId: string,
    tenantSlug: string,
    actor: any,
    userId?: string,
    barberIdQuery?: string,
    unassignedOnly?: boolean,
  ) {
    const tenant = await this.prisma.tenant.findUnique({
      where: { id: tenantId },
      select: { separateCashRegisterEnabled: true },
    });
    const separate = !!tenant?.separateCashRegisterEnabled;

    const db = this.tenantFactory.getClient(tenantSlug);

    let barberWhere: any = {};
    if (separate) {
      if (actor?.role === 'BARBER') {
        if (unassignedOnly) throw new ForbiddenException();
        barberWhere = { barberId: actor.sub };
      } else if (actor?.role === 'OWNER') {
        if (unassignedOnly && barberIdQuery) {
          throw new BadRequestException('Use apenas unassigned=1 ou barberId, não os dois.');
        }
        if (unassignedOnly) {
          barberWhere = { barberId: null };
        } else if (barberIdQuery) {
          barberWhere = { barberId: barberIdQuery };
        }
      } else {
        throw new ForbiddenException();
      }
    }

    const subscriptions = await db.loyaltySubscription.findMany({
      where: {
        plan: { tenantId },
        ...(userId ? { userId } : {}),
        ...barberWhere,
      },
      include: {
        plan: {
          include: {
            items: { include: { service: true } },
          },
        },
        usages: {
          include: {
            appointment: { include: { service: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Enrich with user info from backoffice
    const userIds = [...new Set(subscriptions.map((s) => s.userId))];
    const users = await this.prisma.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true, name: true, email: true, phone: true },
    });
    const userMap = new Map(users.map((u) => [u.id, u]));

    return subscriptions.map((sub) => ({
      ...sub,
      user: userMap.get(sub.userId) ?? null,
    }));
  }

  async updateSubscriptionStatus(id: string, tenantId: string, tenantSlug: string, status: string) {
    const db = this.tenantFactory.getClient(tenantSlug);
    const sub = await db.loyaltySubscription.findFirst({
      where: { id, plan: { tenantId } },
    });
    if (!sub) throw new NotFoundException('Assinatura não encontrada');
    return db.loyaltySubscription.update({ where: { id }, data: { status } });
  }

  /**
   * Dono vincula assinatura ainda sem profissional (barberId null) a um membro da equipe.
   */
  async updateSubscriptionBarber(id: string, tenantId: string, tenantSlug: string, newBarberId: string) {
    const tenant = await this.prisma.tenant.findUnique({
      where: { id: tenantId },
      select: { separateCashRegisterEnabled: true },
    });
    if (!tenant?.separateCashRegisterEnabled) {
      throw new BadRequestException('Só é possível alterar o profissional com caixa separado ativo.');
    }

    await this.assertBarberBelongsToTenant(newBarberId, tenantId);

    const db = this.tenantFactory.getClient(tenantSlug);
    const sub = await db.loyaltySubscription.findFirst({
      where: { id, plan: { tenantId } },
    });
    if (!sub) throw new NotFoundException('Assinatura não encontrada');

    const currentBarberId = (sub as { barberId?: string | null }).barberId;
    if (currentBarberId != null) {
      throw new BadRequestException('Só é possível vincular profissional quando a assinatura ainda não tem um.');
    }

    const nowCheck = new Date();
    const clash = await db.loyaltySubscription.findFirst({
      where: {
        userId: sub.userId,
        planId: sub.planId,
        barberId: newBarberId,
        id: { not: id },
        status: 'ACTIVE',
        OR: [{ endDate: null }, { endDate: { gt: nowCheck } }],
      },
    });
    if (clash) {
      throw new BadRequestException('Já existe assinatura ativa deste plano para este profissional.');
    }

    return db.loyaltySubscription.update({
      where: { id },
      data: { barberId: newBarberId },
    });
  }
}
