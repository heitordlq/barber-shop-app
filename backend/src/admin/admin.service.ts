import { Injectable, NotFoundException } from '@nestjs/common';
import { endOfLocalCalendarDay, startOfLocalCalendarDay } from '../common/calendar-date';
import { PrismaService } from '../prisma/prisma.service';
import { TenantPrismaFactory } from '../prisma/tenant-prisma.factory';

@Injectable()
export class AdminService {
  constructor(
    private prisma: PrismaService,
    private tenantFactory: TenantPrismaFactory,
  ) {}

  async getDashboard() {
    const [totalTenants, activeTenants, delinquentTenants] = await Promise.all([
      this.prisma.tenant.count(),
      this.prisma.tenant.count({ where: { status: 'ACTIVE' } }),
      this.prisma.tenant.count({ where: { status: 'DELINQUENT' } }),
    ]);

    // Aggregate appointment fees across all tenant schemas
    const tenants = await this.prisma.tenant.findMany({
      select: { id: true, slug: true },
    });

    let totalPlatformFees = 0;
    let totalTransactionVolume = 0;

    await Promise.all(
      tenants.map(async (t) => {
        try {
          const db = this.tenantFactory.getClient(t.slug);
          const appointments = await db.appointment.findMany({
            where: { type: 'ONLINE', status: { in: ['CONFIRMED', 'COMPLETED'] } },
            select: { platformFee: true, netAmount: true },
          });
          for (const a of appointments) {
            totalPlatformFees += Number(a.platformFee || 0);
            totalTransactionVolume += Number(a.netAmount || 0) + Number(a.platformFee || 0);
          }
        } catch {
          // Schema may not exist yet for this tenant — skip
        }
      }),
    );

    return {
      totalTenants,
      activeTenants,
      delinquentTenants,
      totalTransactionVolume,
      totalPlatformFees,
    };
  }

  async getAllTenants(page = 1, pageSize = 20, status?: string) {
    const where = status ? { status: status as any } : {};
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

    // Enrich each tenant with appointment count from their own schema
    const enriched = await Promise.all(
      data.map(async (t) => {
        let appointmentCount = 0;
        try {
          const db = this.tenantFactory.getClient(t.slug);
          appointmentCount = await db.appointment.count({ where: { tenantId: t.id } });
        } catch {
          // Schema may not exist — skip
        }
        return { ...t, _count: { appointments: appointmentCount } };
      }),
    );

    return { data: enriched, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
  }

  async updateTenantStatus(
    id: string,
    status: 'ACTIVE' | 'INACTIVE' | 'DELINQUENT',
    reason: string,
  ) {
    const tenant = await this.prisma.tenant.findUnique({
      where: { id },
      select: { status: true },
    });
    if (!tenant) throw new NotFoundException('Barbearia não encontrada');

    const [updated] = await this.prisma.$transaction([
      this.prisma.tenant.update({ where: { id }, data: { status } }),
      this.prisma.tenantAdminLog.create({
        data: {
          tenantId: id,
          action: 'STATUS_CHANGE',
          oldValue: tenant.status,
          newValue: status,
          reason: reason?.trim() || '(sem motivo informado)',
        },
      }),
    ]);
    return updated;
  }

  async updateTenantPlan(id: string, planId: string | null, reason: string) {
    const tenant = await this.prisma.tenant.findUnique({
      where: { id },
      include: { plan: { select: { name: true } } },
    });
    if (!tenant) throw new NotFoundException('Barbearia não encontrada');

    let newPlanName = 'Sem plano';
    if (planId) {
      const plan = await this.prisma.plan.findUnique({
        where: { id: planId },
        select: { name: true },
      });
      if (!plan) throw new NotFoundException('Plano não encontrado');
      newPlanName = plan.name;
    }

    const [updated] = await this.prisma.$transaction([
      this.prisma.tenant.update({
        where: { id },
        data: { planId: planId ?? null },
        include: { plan: true },
      }),
      this.prisma.tenantAdminLog.create({
        data: {
          tenantId: id,
          action: 'PLAN_CHANGE',
          oldValue: tenant.plan?.name ?? 'Sem plano',
          newValue: newPlanName,
          reason: reason?.trim() || '(sem motivo informado)',
        },
      }),
    ]);
    return updated;
  }

  async getTenantDetail(id: string) {
    const tenant = await this.prisma.tenant.findUnique({
      where: { id },
      include: { plan: true },
    });
    if (!tenant) throw new NotFoundException('Barbearia não encontrada');

    let recentAppointments: any[] = [];
    let loyaltySubscriptions: any[] = [];
    let totalRevenue = 0;
    let totalFees = 0;

    try {
      const db = this.tenantFactory.getClient(tenant.slug);

      const [appts, loyaltySubs, revenueAgg] = await Promise.all([
        db.appointment.findMany({
          where: { tenantId: id },
          orderBy: { startTime: 'desc' },
          take: 20,
          include: { service: { select: { name: true } } },
        }),
        db.loyaltySubscription.findMany({
          where: { plan: { tenantId: id }, status: 'ACTIVE' },
          include: {
            plan: { select: { name: true, interval: true } },
          },
          orderBy: { createdAt: 'desc' },
        }),
        db.appointment.findMany({
          where: { tenantId: id, type: 'ONLINE', status: { in: ['CONFIRMED', 'COMPLETED'] } },
          select: { netAmount: true, platformFee: true },
        }),
      ]);

      recentAppointments = appts;
      totalRevenue = revenueAgg.reduce(
        (s, a) => s + Number(a.netAmount || 0) + Number(a.platformFee || 0),
        0,
      );
      totalFees = revenueAgg.reduce((s, a) => s + Number(a.platformFee || 0), 0);

      // Enrich subscriptions with user info from backoffice
      const userIds = [...new Set(loyaltySubs.map((s) => s.userId))];
      const users = await this.prisma.user.findMany({
        where: { id: { in: userIds } },
        select: { id: true, name: true, email: true, phone: true },
      });
      const userMap = new Map(users.map((u) => [u.id, u]));
      loyaltySubscriptions = loyaltySubs.map((sub) => ({
        ...sub,
        user: userMap.get(sub.userId) ?? null,
      }));
    } catch {
      // Tenant schema may not be provisioned yet
    }

    const adminLogs = await this.prisma.tenantAdminLog.findMany({
      where: { tenantId: id },
      orderBy: { createdAt: 'desc' },
      take: 30,
    });

    const teamUsers = await this.prisma.user.findMany({
      where: {
        tenantId: id,
        role: { in: ['OWNER', 'BARBER'] },
        blocked: false,
      },
      select: { id: true, name: true, email: true, phone: true, role: true },
      orderBy: { name: 'asc' },
    });
    const contactOwners = teamUsers.filter((u) => u.role === 'OWNER');
    const contactBarbers = teamUsers.filter((u) => u.role === 'BARBER');

    return {
      tenant: { ...tenant, _count: { appointments: recentAppointments.length } },
      recentAppointments,
      loyaltySubscriptions,
      adminLogs,
      totalRevenue,
      totalFees,
      contact: {
        shopPhone: tenant.phone,
        shopWhatsapp: tenant.whatsapp,
        shopAddress: tenant.address,
        owners: contactOwners,
        barbers: contactBarbers,
      },
    };
  }

  async getFinanceiro(dateFrom?: string, dateTo?: string) {
    const now = new Date();
    const start = dateFrom
      ? startOfLocalCalendarDay(dateFrom)
      : new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
    const end = dateTo
      ? endOfLocalCalendarDay(dateTo)
      : new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

    const tenants = await this.prisma.tenant.findMany({
      select: { id: true, name: true, slug: true },
    });

    type TenantRow = {
      tenantId: string;
      name: string;
      slug: string;
      onlineRevenue: number;
      manualRevenue: number;
      fees: number;
      totalAppointments: number;
    };

    const rows: TenantRow[] = [];

    await Promise.all(
      tenants.map(async (t) => {
        try {
          const db = this.tenantFactory.getClient(t.slug);
          const appointments = await db.appointment.findMany({
            where: {
              startTime: { gte: start, lte: end },
              status: { in: ['CONFIRMED', 'COMPLETED'] },
            },
            select: { type: true, netAmount: true, platformFee: true },
          });

          if (!appointments.length) return;

          const row: TenantRow = {
            tenantId: t.id,
            name: t.name,
            slug: t.slug,
            onlineRevenue: 0,
            manualRevenue: 0,
            fees: 0,
            totalAppointments: appointments.length,
          };

          for (const a of appointments) {
            const gross = Number(a.netAmount || 0) + Number(a.platformFee || 0);
            if (a.type === 'ONLINE') {
              row.onlineRevenue += gross;
              row.fees += Number(a.platformFee || 0);
            } else {
              row.manualRevenue += gross;
            }
          }

          rows.push(row);
        } catch {
          // Tenant schema may not exist yet
        }
      }),
    );

    rows.sort((a, b) =>
      b.onlineRevenue + b.manualRevenue - (a.onlineRevenue + a.manualRevenue),
    );

    const totals = rows.reduce(
      (acc, r) => ({
        onlineRevenue: acc.onlineRevenue + r.onlineRevenue,
        manualRevenue: acc.manualRevenue + r.manualRevenue,
        fees: acc.fees + r.fees,
        totalAppointments: acc.totalAppointments + r.totalAppointments,
      }),
      { onlineRevenue: 0, manualRevenue: 0, fees: 0, totalAppointments: 0 },
    );

    return { rows, totals, dateFrom: start.toISOString(), dateTo: end.toISOString() };
  }
}
