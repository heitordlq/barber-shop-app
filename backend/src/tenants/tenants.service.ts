import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TenantPrismaFactory } from '../prisma/tenant-prisma.factory';
import { UpdateTenantDto } from './dto/tenant.dto';
import { BillingModel, TenantStatus } from '@prisma/client';

const DAY_KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

function isOpenNow(wh: Record<string, any>, temporarilyClosed: boolean): boolean {
  if (temporarilyClosed) return false;
  if (!wh || Object.keys(wh).length === 0) return false;
  const now = new Date();
  const dayConfig = wh[DAY_KEYS[now.getDay()]];
  if (!dayConfig?.open || !dayConfig?.close) return false;
  const [oH, oM] = dayConfig.open.split(':').map(Number);
  const [cH, cM] = dayConfig.close.split(':').map(Number);
  const open = new Date(now); open.setHours(oH, oM, 0, 0);
  const close = new Date(now); close.setHours(cH, cM, 0, 0);
  return now >= open && now < close;
}

function hasOpeningThisWeek(wh: Record<string, any>, temporarilyClosed: boolean): boolean {
  if (temporarilyClosed) return false;
  if (!wh || Object.keys(wh).length === 0) return false;
  const now = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    const cfg = wh[DAY_KEYS[d.getDay()]];
    if (cfg?.open && cfg?.close) return true;
  }
  return false;
}

function parseWh(raw: unknown): Record<string, any> {
  if (!raw) return {};
  if (typeof raw === 'string') {
    try { return JSON.parse(raw); } catch { return {}; }
  }
  return raw as Record<string, any>;
}

function weeklyCapacitySlots(wh: Record<string, any>): number {
  const now = new Date();
  let total = 0;
  for (let i = 0; i < 7; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    const cfg = wh[DAY_KEYS[d.getDay()]];
    if (!cfg?.open || !cfg?.close) continue;
    const [oH, oM] = (cfg.open as string).split(':').map(Number);
    const [cH, cM] = (cfg.close as string).split(':').map(Number);
    const openMs = oH * 60 + oM;
    const closeMs = cH * 60 + cM;
    if (closeMs > openMs) total += Math.floor((closeMs - openMs) / 30);
  }
  return total;
}

@Injectable()
export class TenantsService {
  constructor(
    private prisma: PrismaService,
    private tenantFactory: TenantPrismaFactory,
  ) {}

  async findMe(tenantId: string) {
    const tenant = await this.prisma.tenant.findUnique({
      where: { id: tenantId },
      include: { plan: true },
    });
    if (!tenant) throw new NotFoundException('Barbearia não encontrada');
    return tenant;
  }

  async findBySlug(slug: string) {
    const tenant = await this.prisma.tenant.findUnique({
      where: { slug },
      include: { plan: true },
    });
    if (!tenant) throw new NotFoundException('Barbearia não encontrada');

    // Fetch active services from the tenant's own schema
    const db = this.tenantFactory.getClient(slug);
    const services = await db.service.findMany({
      where: { tenantId: tenant.id, active: true },
    });

    return { ...tenant, services };
  }

  async getPublicAppointmentSummary(slug: string, appointmentId: string) {
    const tenant = await this.prisma.tenant.findUnique({
      where: { slug },
      select: { id: true, name: true },
    });
    if (!tenant) throw new NotFoundException('Barbearia não encontrada');

    const db = this.tenantFactory.getClient(slug);
    const appt = await db.appointment.findFirst({
      where: { id: appointmentId, tenantId: tenant.id },
      select: {
        startTime: true,
        service: { select: { name: true } },
        barberId: true,
        barberName: true,
      },
    });
    if (!appt) throw new NotFoundException('Agendamento não encontrado');

    // Fetch barber name from backoffice if barberId exists and barberName not cached
    let barberName = appt.barberName ?? null;
    if (appt.barberId && !barberName) {
      const barber = await this.prisma.user.findUnique({
        where: { id: appt.barberId },
        select: { name: true },
      });
      barberName = barber?.name ?? null;
    }

    return {
      serviceName: appt.service.name,
      startTime: appt.startTime.toISOString(),
      barberName,
      tenantName: tenant.name,
    };
  }

  async findPublicBarbers(slug: string) {
    const tenant = await this.prisma.tenant.findUnique({ where: { slug }, select: { id: true } });
    if (!tenant) throw new NotFoundException('Barbearia não encontrada');

    return this.prisma.user.findMany({
      where: {
        tenantId: tenant.id,
        role: { in: ['OWNER', 'BARBER'] },
        blocked: false,
      },
      select: {
        id: true,
        name: true,
        role: true,
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async updateMe(tenantId: string, dto: UpdateTenantDto) {
    const current = await this.prisma.tenant.findUnique({ where: { id: tenantId } });
    if (!current) throw new NotFoundException('Barbearia não encontrada');

    const nextBilling = dto.billingModel ?? current.billingModel;
    const existingDefault =
      current.defaultOwnerCutPercent != null ? Number(current.defaultOwnerCutPercent) : undefined;
    const nextDefault =
      dto.defaultOwnerCutPercent !== undefined ? dto.defaultOwnerCutPercent : existingDefault;

    if (nextBilling === BillingModel.OWNER_CUT_PERCENT) {
      if (nextDefault === undefined || Number.isNaN(nextDefault)) {
        throw new BadRequestException(
          'Informe a porcentagem padrão do dono (0–100) para o modelo de repasse percentual.',
        );
      }
    }

    const data: Record<string, unknown> = {};
    if (dto.name !== undefined) data.name = dto.name;
    if (dto.description !== undefined) data.description = dto.description;
    if (dto.address !== undefined) data.address = dto.address;
    if (dto.phone !== undefined) data.phone = dto.phone;
    if (dto.workingHours !== undefined) data.workingHours = dto.workingHours;
    if (dto.billingModel !== undefined) data.billingModel = dto.billingModel;
    if (dto.defaultOwnerCutPercent !== undefined) data.defaultOwnerCutPercent = dto.defaultOwnerCutPercent;
    if (dto.separateCashRegisterEnabled !== undefined) {
      data.separateCashRegisterEnabled = dto.separateCashRegisterEnabled;
    }
    if (dto.appointmentGapMinutes !== undefined) {
      data.appointmentGapMinutes = dto.appointmentGapMinutes;
    }

    return this.prisma.tenant.update({
      where: { id: tenantId },
      data: data as any,
      include: { plan: true },
    });
  }

  async toggleTemporarilyClosed(tenantId: string) {
    const tenant = await this.prisma.tenant.findUnique({ where: { id: tenantId } });
    if (!tenant) throw new NotFoundException('Barbearia não encontrada');
    return this.prisma.tenant.update({
      where: { id: tenantId },
      data: { temporarilyClosed: !tenant.temporarilyClosed },
      select: { id: true, temporarilyClosed: true },
    });
  }

  /** Agrega nomes de serviços ativos de todas as barbearias (schemas tenant). */
  async getPopularServices(limit = 36) {
    const tenants = await this.prisma.tenant.findMany({
      where: { status: 'ACTIVE' },
      select: { id: true, slug: true },
    });
    const counts = new Map<string, number>();
    for (const t of tenants) {
      try {
        const db = this.tenantFactory.getClient(t.slug);
        const rows = await db.service.findMany({
          where: { tenantId: t.id, active: true },
          select: { name: true },
        });
        for (const r of rows) {
          const key = r.name.trim();
          if (!key) continue;
          counts.set(key, (counts.get(key) ?? 0) + 1);
        }
      } catch {
        /* schema tenant ausente */
      }
    }
    const items = [...counts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
      .slice(0, limit);
    return { items };
  }

  /** Resolve usuário backoffice por e-mail ou telefone (busca pública, sem auth). */
  async lookupUserIdForPublicIdentify(email?: string, phone?: string): Promise<string | null> {
    const e = email?.trim();
    const digits = phone?.replace(/\D/g, '') ?? '';
    if (!e && digits.length < 8) return null;
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          ...(e ? [{ email: { equals: e, mode: 'insensitive' as const } }] : []),
          ...(digits.length >= 8 ? [{ phone: { contains: digits } }] : []),
        ],
      },
      select: { id: true },
    });
    return user?.id ?? null;
  }

  async searchPublic(params: {
    q?: string;
    service?: string;
    serviceTerms?: string[];
    visitedSlugsOrder?: string[];
    subscriberUserId?: string | null;
    subscriberOnly?: boolean;
    filter?: 'available_now' | 'available_week' | 'slot_free_now' | 'slot_free_week' | 'all';
    page?: number;
    pageSize?: number;
  }) {
    const {
      q,
      service,
      serviceTerms = [],
      visitedSlugsOrder,
      subscriberUserId,
      subscriberOnly,
      filter = 'all',
      page = 1,
      pageSize = 20,
    } = params;

    const where: any = { status: 'ACTIVE' };

    if (q) {
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { address: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
      ];
    }

    if (service) {
      where.serviceCategories = { has: service };
    }

    let tenants = await this.prisma.tenant.findMany({
      where,
      select: {
        id: true,
        slug: true,
        name: true,
        description: true,
        address: true,
        phone: true,
        whatsapp: true,
        logoUrl: true,
        photos: true,
        workingHours: true,
        temporarilyClosed: true,
        serviceCategories: true,
      },
      orderBy: { name: 'asc' },
    });

    if (serviceTerms.length > 0) {
      const hits = await Promise.all(
        tenants.map((t) => this.tenantHasAnyActiveServiceLike(t.slug, t.id, serviceTerms)),
      );
      tenants = tenants.filter((_, i) => hits[i]);
    }

    if (subscriberOnly) {
      if (!subscriberUserId) {
        tenants = [];
      } else {
        const ok = await Promise.all(
          tenants.map((t) => this.tenantHasActiveLoyaltySubscription(t.slug, subscriberUserId)),
        );
        tenants = tenants.filter((_, i) => ok[i]);
      }
    }

    if (visitedSlugsOrder && visitedSlugsOrder.length > 0) {
      const rank = new Map(visitedSlugsOrder.map((s, i) => [s, i]));
      tenants = tenants.filter((t) => rank.has(t.slug));
      tenants.sort((a, b) => (rank.get(a.slug)! - rank.get(b.slug)!));
    }

    let filtered: typeof tenants;

    if (filter === 'all') {
      filtered = tenants;
    } else if (filter === 'available_now') {
      filtered = tenants.filter((t) => isOpenNow(parseWh(t.workingHours), t.temporarilyClosed));
    } else if (filter === 'available_week') {
      filtered = tenants.filter((t) => hasOpeningThisWeek(parseWh(t.workingHours), t.temporarilyClosed));
    } else if (filter === 'slot_free_now') {
      const openNow = tenants.filter((t) => isOpenNow(parseWh(t.workingHours), t.temporarilyClosed));
      const results = await Promise.all(
        openNow.map(async (t) => {
          const barbersCount = await this.prisma.user.count({
            where: { tenantId: t.id, role: { in: ['OWNER', 'BARBER'] }, blocked: false },
          });
          if (barbersCount === 0) return false;
          const now = new Date();
          const next30 = new Date(now.getTime() + 30 * 60 * 1000);
          try {
            const db = this.tenantFactory.getClient(t.slug);
            const busyCount = await db.appointment.count({
              where: {
                tenantId: t.id,
                status: { in: ['PENDING', 'CONFIRMED'] },
                startTime: { lt: next30 },
                endTime: { gt: now },
              },
            });
            return busyCount < barbersCount;
          } catch {
            return false;
          }
        }),
      );
      filtered = openNow.filter((_, i) => results[i]);
    } else {
      const openWeek = tenants.filter((t) => hasOpeningThisWeek(parseWh(t.workingHours), t.temporarilyClosed));
      const results = await Promise.all(
        openWeek.map(async (t) => {
          const wh = parseWh(t.workingHours);
          const barbersCount = await this.prisma.user.count({
            where: { tenantId: t.id, role: { in: ['OWNER', 'BARBER'] }, blocked: false },
          });
          if (barbersCount === 0) return false;
          const capacity = weeklyCapacitySlots(wh) * barbersCount;
          if (capacity === 0) return false;
          const now = new Date();
          const startOfToday = new Date(now); startOfToday.setHours(0, 0, 0, 0);
          const weekEnd = new Date(startOfToday.getTime() + 7 * 24 * 60 * 60 * 1000);
          try {
            const db = this.tenantFactory.getClient(t.slug);
            const bookedCount = await db.appointment.count({
              where: {
                tenantId: t.id,
                status: { in: ['PENDING', 'CONFIRMED'] },
                startTime: { gte: startOfToday, lt: weekEnd },
              },
            });
            return bookedCount < capacity;
          } catch {
            return false;
          }
        }),
      );
      filtered = openWeek.filter((_, i) => results[i]);
    }

    const total = filtered.length;
    const data = filtered.slice((page - 1) * pageSize, page * pageSize);

    return { data, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
  }

  private async tenantHasAnyActiveServiceLike(
    slug: string,
    tenantId: string,
    terms: string[],
  ): Promise<boolean> {
    try {
      const db = this.tenantFactory.getClient(slug);
      const found = await db.service.findFirst({
        where: {
          tenantId,
          active: true,
          OR: terms.map((term) => ({
            name: { contains: term, mode: 'insensitive' as const },
          })),
        },
      });
      return !!found;
    } catch {
      return false;
    }
  }

  private async tenantHasActiveLoyaltySubscription(slug: string, userId: string): Promise<boolean> {
    try {
      const db = this.tenantFactory.getClient(slug);
      const now = new Date();
      const sub = await db.loyaltySubscription.findFirst({
        where: {
          userId,
          status: 'ACTIVE',
          OR: [{ endDate: null }, { endDate: { gte: now } }],
        },
      });
      return !!sub;
    } catch {
      return false;
    }
  }

  async updateStatus(id: string, status: TenantStatus) {
    return this.prisma.tenant.update({
      where: { id },
      data: { status },
    });
  }

  async findAll(page = 1, pageSize = 20, status?: TenantStatus) {
    const where = status ? { status } : {};
    const [data, total] = await Promise.all([
      this.prisma.tenant.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: { plan: true },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.tenant.count({ where }),
    ]);
    return { data, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
  }
}
