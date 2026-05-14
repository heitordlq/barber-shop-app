import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TenantPrismaFactory } from '../prisma/tenant-prisma.factory';
import { CreateServiceDto, UpdateServiceDto } from './dto/service.dto';

@Injectable()
export class ServicesService {
  constructor(
    private prisma: PrismaService,
    private tenantFactory: TenantPrismaFactory,
  ) {}

  /** Limite de serviços no schema do tenant: TENANT = maxServices; PER_BARBER = (maxServicesPerBarber ?? maxServices) × nº de profissionais. */
  private async resolveMaxServicesCap(
    tenantId: string,
    plan: { limitsScope: string; maxServices: number | null; maxServicesPerBarber: number | null } | null,
  ): Promise<number | null> {
    if (!plan) return null;
    if (plan.limitsScope === 'PER_BARBER') {
      const per = plan.maxServicesPerBarber ?? plan.maxServices;
      if (per == null) return null;
      const team = await this.prisma.user.count({
        where: { tenantId, role: { in: ['OWNER', 'BARBER'] } },
      });
      const n = Math.max(1, team);
      return per * n;
    }
    return plan.maxServices ?? null;
  }

  async create(tenantId: string, tenantSlug: string, dto: CreateServiceDto) {
    const tenant = await this.prisma.tenant.findUnique({
      where: { id: tenantId },
      include: { plan: true },
    });

    const cap = await this.resolveMaxServicesCap(tenantId, tenant?.plan ?? null);
    if (cap != null) {
      const db = this.tenantFactory.getClient(tenantSlug);
      const count = await db.service.count({ where: { tenantId } });
      if (count >= cap) {
        throw new ForbiddenException(
          `Seu plano permite no máximo ${cap} serviço(s) no total. Faça um upgrade para adicionar mais.`,
        );
      }
    }

    const db = this.tenantFactory.getClient(tenantSlug);
    return db.service.create({
      data: { ...dto, tenantId },
    });
  }

  async findAll(tenantId: string, tenantSlug: string, onlyActive = false) {
    const db = this.tenantFactory.getClient(tenantSlug);
    return db.service.findMany({
      where: { tenantId, ...(onlyActive ? { active: true } : {}) },
      orderBy: { createdAt: 'asc' },
    });
  }

  async findOne(id: string, tenantId: string, tenantSlug: string) {
    const db = this.tenantFactory.getClient(tenantSlug);
    const service = await db.service.findFirst({ where: { id, tenantId } });
    if (!service) throw new NotFoundException('Serviço não encontrado');
    return service;
  }

  async update(id: string, tenantId: string, tenantSlug: string, dto: UpdateServiceDto) {
    await this.findOne(id, tenantId, tenantSlug);
    const db = this.tenantFactory.getClient(tenantSlug);
    return db.service.update({ where: { id }, data: dto });
  }

  async remove(id: string, tenantId: string, tenantSlug: string) {
    await this.findOne(id, tenantId, tenantSlug);
    const db = this.tenantFactory.getClient(tenantSlug);
    return db.service.update({ where: { id }, data: { active: false } });
  }
}
