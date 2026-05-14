import {
  Injectable,
  BadRequestException,
  NotFoundException,
  RawBodyRequest,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { endOfLocalCalendarDay, startOfLocalCalendarDay } from '../common/calendar-date';
import { PrismaService } from '../prisma/prisma.service';
import { TenantPrismaFactory } from '../prisma/tenant-prisma.factory';
import { ScheduleService } from '../schedule/schedule.service';
import { NotificationsService } from '../notifications/notifications.service';
import Stripe from 'stripe';
import { CreatePaymentIntentDto, CreateLoyaltyBookingDto } from './dto/payment.dto';
import { Request } from 'express';
import { BillingModel } from '@prisma/client';

@Injectable()
export class PaymentsService {
  private stripe: any;

  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
    private tenantFactory: TenantPrismaFactory,
    private scheduleService: ScheduleService,
    private notificationsService: NotificationsService,
  ) {
    this.stripe = new Stripe(this.config.get<string>('STRIPE_SECRET_KEY')!, {
      apiVersion: '2024-06-20' as any,
    });
  }

  // ── Stripe Connect Onboarding ─────────────────────────────────────────────

  async getOnboardingLink(tenantId: string) {
    if (this.config.get('DEV_MODE') === 'true') {
      return { url: `${this.config.get('BARBERSHOP_URL')}/onboarding?refresh=true` };
    }

    const tenant = await this.prisma.tenant.findUnique({ where: { id: tenantId } });
    if (!tenant) throw new NotFoundException('Barbearia não encontrada');

    let accountId = tenant.stripeAccountId;

    if (!accountId) {
      const account = await this.stripe.accounts.create({
        type: 'express',
        country: 'BR',
        capabilities: { transfers: { requested: true }, card_payments: { requested: true } },
      });
      accountId = account.id;
      await this.prisma.tenant.update({
        where: { id: tenantId },
        data: { stripeAccountId: accountId },
      });
    }

    const link = await this.stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${this.config.get('BARBERSHOP_URL')}/onboarding?refresh=true`,
      return_url: `${this.config.get('BARBERSHOP_URL')}/onboarding/success`,
      type: 'account_onboarding',
    });

    return { url: link.url };
  }

  async checkOnboardingStatus(tenantId: string) {
    if (this.config.get('DEV_MODE') === 'true') {
      await this.prisma.tenant.update({
        where: { id: tenantId },
        data: { stripeOnboardingComplete: true, stripeAccountId: 'acct_dev_mode' },
      });
      return { complete: true, accountId: 'acct_dev_mode' };
    }

    const tenant = await this.prisma.tenant.findUnique({ where: { id: tenantId } });
    if (!tenant?.stripeAccountId) return { complete: false };

    const account = await this.stripe.accounts.retrieve(tenant.stripeAccountId);
    const complete = account.charges_enabled && account.payouts_enabled;

    if (complete && !tenant.stripeOnboardingComplete) {
      await this.prisma.tenant.update({
        where: { id: tenantId },
        data: { stripeOnboardingComplete: true },
      });
    }

    return { complete, accountId: tenant.stripeAccountId };
  }

  // ── Criar Payment Intent ──────────────────────────────────────────────────

  async createPaymentIntent(dto: CreatePaymentIntentDto) {
    // dto.tenantSlug is required (sent by client page which knows the slug from URL)
    const tenantSlug = dto.tenantSlug;
    if (!tenantSlug) throw new BadRequestException('tenantSlug não informado');

    const tenant = await this.prisma.tenant.findUnique({
      where: { slug: tenantSlug },
      include: { plan: true },
    });
    if (!tenant) throw new NotFoundException('Barbearia não encontrada');

    if (!tenant.stripeAccountId || !tenant.stripeOnboardingComplete) {
      throw new BadRequestException('Barbearia não configurou pagamentos');
    }
    if (tenant.status !== 'ACTIVE') {
      throw new BadRequestException('Barbearia indisponível');
    }

    const db = this.tenantFactory.getClient(tenantSlug);
    const service = await db.service.findFirst({
      where: { id: dto.serviceId, active: true },
    });
    if (!service) throw new NotFoundException('Serviço não encontrado');

    const totalAmount = Math.round(Number(service.price) * 100);

    const plan = tenant.plan;
    const cardPct = plan ? Number(plan.creditCardFeePercent) : 0;
    const fixedFee = plan ? Number(plan.platformFeeFixed) : 2;
    const platformFee = Math.round(totalAmount * (cardPct / 100)) + Math.round(fixedFee * 100);

    const startTime = new Date(dto.startTime);
    const endTime = new Date(startTime.getTime() + Number(service.duration) * 60 * 1000);

    let barberId: string | null = null;
    let barberName: string | null = null;
    if (dto.barberId) {
      const barber = await this.prisma.user.findFirst({
        where: {
          id: dto.barberId,
          tenantId: tenant.id,
          role: { in: ['OWNER', 'BARBER'] },
        },
        select: { id: true, name: true, blocked: true },
      });
      if (!barber) throw new BadRequestException('Barbeiro inválido');
      if (barber.blocked) throw new BadRequestException('Este profissional não está disponível');
      barberId = barber.id;
      barberName = barber.name;
    }

    await this.scheduleService.ensureNoScheduleConflict(tenantSlug, tenant.id, startTime, endTime, barberId);

    let appointment = await db.appointment.create({
      data: {
        tenantId: tenant.id,
        tenantSlug,
        serviceId: service.id,
        barberId,
        barberName,
        clientName: dto.clientName,
        clientEmail: dto.clientEmail,
        clientPhone: dto.clientPhone,
        startTime,
        endTime,
        status: 'PENDING',
        type: 'ONLINE',
        bookingSource: 'App',
        platformFee: platformFee / 100,
        netAmount: (totalAmount - platformFee) / 100,
      },
    });

    if (this.config.get('DEV_MODE') === 'true') {
      appointment = await db.appointment.update({
        where: { id: appointment.id },
        data: { status: 'CONFIRMED', paymentIntentId: 'pi_dev_mode_12345' },
      });
      return {
        clientSecret: 'pi_dev_mode_secret',
        appointmentId: appointment.id,
      };
    }

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: totalAmount,
      currency: 'brl',
      return_url: `${this.config.get('CLIENT_URL')}/${tenant.slug}/agendar/confirmado`,
      transfer_data: { destination: tenant.stripeAccountId },
      application_fee_amount: platformFee,
      metadata: {
        appointmentId: appointment.id,
        tenantId: tenant.id,
        tenantSlug,        // stored for webhook routing
        serviceId: service.id,
      },
    });

    await db.appointment.update({
      where: { id: appointment.id },
      data: { paymentIntentId: paymentIntent.id },
    });

    return {
      clientSecret: paymentIntent.client_secret,
      appointmentId: appointment.id,
    };
  }

  async createLoyaltyBooking(dto: CreateLoyaltyBookingDto) {
    const tenantSlug = dto.tenantSlug;
    if (!tenantSlug) throw new BadRequestException('tenantSlug não informado');

    const tenant = await this.prisma.tenant.findUnique({
      where: { slug: tenantSlug },
      select: { id: true, slug: true, separateCashRegisterEnabled: true },
    });
    if (!tenant) throw new NotFoundException('Barbearia não encontrada');

    const db = this.tenantFactory.getClient(tenantSlug);
    const service = await db.service.findFirst({
      where: { id: dto.serviceId, active: true },
    });
    if (!service) throw new NotFoundException('Serviço não encontrado');

    let barberId: string | null = null;
    let barberName: string | null = null;
    if (dto.barberId) {
      const barber = await this.prisma.user.findFirst({
        where: {
          id: dto.barberId,
          tenantId: tenant.id,
          role: { in: ['OWNER', 'BARBER'] },
        },
        select: { id: true, name: true, blocked: true },
      });
      if (!barber) throw new BadRequestException('Barbeiro inválido');
      if (barber.blocked) throw new BadRequestException('Este profissional não está disponível');
      barberId = barber.id;
      barberName = barber.name;
    }

    const separate = !!tenant.separateCashRegisterEnabled;
    if (separate && !dto.barberId) {
      throw new BadRequestException('Informe o profissional para agendar com plano de fidelidade.');
    }

    let barberWhere: any = {};
    if (separate && barberId) {
      barberWhere = { barberId };
    }

    const sub = await db.loyaltySubscription.findFirst({
      where: {
        id: dto.subscriptionId,
        status: 'ACTIVE',
        plan: { items: { some: { serviceId: dto.serviceId } } },
        ...barberWhere,
      },
      include: {
        usages: { include: { appointment: { select: { serviceId: true } } } },
        plan: { include: { items: { where: { serviceId: dto.serviceId } } } },
      },
    });

    if (!sub) throw new BadRequestException('Plano inválido ou expirado');

    const subBarberId = (sub as any).barberId as string | null | undefined;
    if (separate && subBarberId == null) {
      throw new BadRequestException(
        'Este plano ainda não está vinculado a um profissional. Conclua o vínculo na área de Clientes da barbearia.',
      );
    }
    if (separate && subBarberId && barberId && subBarberId !== barberId) {
      throw new BadRequestException('Esta assinatura pertence a outro profissional');
    }

    // Validate subscriber identity
    const subUser = await this.prisma.user.findUnique({
      where: { id: sub.userId },
      select: { id: true, email: true, phone: true },
    });

    const normPhone = (p?: string | null) => (p || '').replace(/\D/g, '');
    if (dto.userId && dto.userId.trim() && dto.userId !== sub.userId) {
      throw new BadRequestException('Assinatura não corresponde ao usuário informado');
    }
    if (!dto.userId || !dto.userId.trim()) {
      const emailOk =
        dto.clientEmail &&
        subUser?.email &&
        dto.clientEmail.trim().toLowerCase() === subUser.email.trim().toLowerCase();
      const phoneOk =
        normPhone(dto.clientPhone) &&
        normPhone(dto.clientPhone) === normPhone(subUser?.phone);
      if (!emailOk && !phoneOk) {
        throw new BadRequestException(
          'Use o mesmo e-mail ou telefone cadastrados no plano para confirmar o agendamento',
        );
      }
    }

    const planItem = sub.plan.items[0];
    if (!planItem) throw new BadRequestException('Serviço não faz parte deste plano');

    const usedCount = sub.usages.filter((u) => u.appointment?.serviceId === dto.serviceId).length;
    if (usedCount >= planItem.quantity) {
      throw new BadRequestException('Você atingiu o limite de usos deste plano');
    }

    const startTime = new Date(dto.startTime);
    const endTime = new Date(startTime.getTime() + Number(service.duration) * 60 * 1000);

    if (!planItem.allowedDays.includes(startTime.getDay())) {
      throw new BadRequestException('Este serviço não pode ser agendado via plano neste dia da semana');
    }

    await this.scheduleService.ensureNoScheduleConflict(tenantSlug, tenant.id, startTime, endTime, barberId);

    const appointment = await db.appointment.create({
      data: {
        tenantId: tenant.id,
        tenantSlug,
        serviceId: service.id,
        userId: sub.userId,
        barberId,
        barberName,
        clientName: dto.clientName,
        clientEmail: dto.clientEmail,
        clientPhone: dto.clientPhone,
        startTime,
        endTime,
        status: 'CONFIRMED',
        type: 'ONLINE',
        bookingSource: 'App',
        platformFee: 0,
        netAmount: 0,
        loyaltyUsage: {
          create: { subscriptionId: sub.id },
        },
      },
      include: { service: true },
    });

    // Build a tenant-like object for notifications
    const tenantForNotif = await this.prisma.tenant.findUnique({ where: { id: tenant.id } });
    await this.notificationsService.sendBookingConfirmation({ ...appointment, tenant: tenantForNotif });

    return appointment;
  }

  // ── Webhook Handler ───────────────────────────────────────────────────────

  async handleWebhook(req: RawBodyRequest<Request>) {
    const sig = req.headers['stripe-signature'] as string;
    const webhookSecret = this.config.get<string>('STRIPE_WEBHOOK_SECRET')!;

    let event: any;
    try {
      event = this.stripe.webhooks.constructEvent(req.rawBody!, sig, webhookSecret);
    } catch {
      throw new BadRequestException('Webhook signature inválida');
    }

    switch (event.type) {
      case 'payment_intent.succeeded':
        await this.handlePaymentSuccess(event.data.object as any);
        break;
      case 'payment_intent.payment_failed':
        await this.handlePaymentFailed(event.data.object as any);
        break;
    }

    return { received: true };
  }

  private async handlePaymentSuccess(paymentIntent: any) {
    const { appointmentId, tenantSlug } = paymentIntent.metadata;
    if (!appointmentId || !tenantSlug) return;

    const db = this.tenantFactory.getClient(tenantSlug);
    const appointment = await db.appointment.update({
      where: { id: appointmentId },
      data: { status: 'CONFIRMED' },
      include: { service: true },
    });

    const tenant = await this.prisma.tenant.findUnique({
      where: { slug: tenantSlug },
    });
    await this.notificationsService.sendBookingConfirmation({ ...appointment, tenant });
  }

  private async handlePaymentFailed(paymentIntent: any) {
    const { appointmentId, tenantSlug } = paymentIntent.metadata;
    if (!appointmentId || !tenantSlug) return;

    const db = this.tenantFactory.getClient(tenantSlug);
    await db.appointment.update({
      where: { id: appointmentId },
      data: { status: 'CANCELLED' },
    });
  }

  // ── Dashboard Financeiro ──────────────────────────────────────────────────

  async getFinancialSummary(
    tenantId: string,
    tenantSlug: string,
    date?: string,
    dateFrom?: string,
    dateTo?: string,
    user?: { sub: string; role: string },
    barberId?: string,
  ) {
    let start: Date, end: Date;

    if (dateFrom && dateTo) {
      start = startOfLocalCalendarDay(dateFrom);
      end = endOfLocalCalendarDay(dateTo);
    } else if (date) {
      start = startOfLocalCalendarDay(date);
      end = endOfLocalCalendarDay(date);
    } else {
      const targetDate = new Date();
      start = new Date(targetDate);
      end = new Date(targetDate);
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
    }

    const db = this.tenantFactory.getClient(tenantSlug);

    const tenant = await this.prisma.tenant.findUnique({
      where: { id: tenantId },
      select: {
        billingModel: true,
        defaultOwnerCutPercent: true,
      },
    });
    if (!tenant) throw new NotFoundException('Barbearia não encontrada');

    let filterBarberId: string | undefined;
    if (user?.role === 'BARBER') {
      if (barberId && barberId !== user.sub) {
        throw new ForbiddenException('Você só pode ver o seu próprio caixa');
      }
      filterBarberId = user.sub;
    } else if (barberId) {
      filterBarberId = barberId;
    }

    const [appointmentsRaw, subscriptionsRaw, teamUsers] = await Promise.all([
      db.appointment.findMany({
        where: {
          tenantId,
          startTime: { gte: start, lte: end },
          status: { in: ['CONFIRMED', 'COMPLETED', 'NO_SHOW'] },
        },
      }),
      db.loyaltySubscription.findMany({
        where: {
          plan: { tenantId },
          createdAt: { gte: start, lte: end },
          status: { not: 'CANCELED' },
        },
        include: { plan: true },
      }),
      this.prisma.user.findMany({
        where: { tenantId, role: { in: ['OWNER', 'BARBER'] } },
        select: {
          id: true,
          name: true,
          role: true,
          ownerCutPercentOverride: true,
          tenantRevenueSharePercent: true,
        },
      }),
    ]);

    const appointments = filterBarberId
      ? appointmentsRaw.filter((a) => a.barberId === filterBarberId)
      : appointmentsRaw;

    const subscriptions =
      filterBarberId ? [] : subscriptionsRaw;

    const defaultOwnerPct = Number(tenant.defaultOwnerCutPercent ?? 0);
    const ownerPctForBarber = (bid: string | null | undefined) => {
      if (!bid) return defaultOwnerPct;
      const u = teamUsers.find((x) => x.id === bid);
      const o = u?.ownerCutPercentOverride;
      const p = o != null ? Number(o) : defaultOwnerPct;
      return Math.min(100, Math.max(0, p));
    };

    const online = appointments.filter((a) => a.type === 'ONLINE');
    const manual = appointments.filter((a) => a.type === 'MANUAL');
    const subRevenue = subscriptions.reduce((s, sub) => s + Number(sub.plan.price || 0), 0);

    let ownerShare = 0;
    let barberShare = 0;
    const barberBreakdownMap = new Map<string, number>();

    if (tenant.billingModel === BillingModel.OWNER_CUT_PERCENT) {
      for (const a of appointments) {
        const net = Number(a.netAmount || 0);
        if (!a.barberId) {
          ownerShare += net;
          continue;
        }
        const p = ownerPctForBarber(a.barberId) / 100;
        const toOwner = net * p;
        const toBarber = net * (1 - p);
        ownerShare += toOwner;
        barberShare += toBarber;
        barberBreakdownMap.set(a.barberId, (barberBreakdownMap.get(a.barberId) ?? 0) + toBarber);
      }
    }

    const barberIds = [...barberBreakdownMap.keys()];
    const barberNames =
      barberIds.length > 0
        ? await this.prisma.user.findMany({
            where: { id: { in: barberIds } },
            select: { id: true, name: true },
          })
        : [];
    const nameById = Object.fromEntries(barberNames.map((b) => [b.id, b.name]));

    const barberBreakdown = [...barberBreakdownMap.entries()].map(([id, amount]) => ({
      barberId: id,
      barberName: nameById[id] ?? id,
      barberShare: amount,
    }));

    /** Base para participação contratual: líquido de todos os atendimentos do período (sem filtro por barbeiro). */
    const contractRevenueBase = appointmentsRaw.reduce((s, a) => s + Number(a.netAmount || 0), 0);
    const contractRowsAll = teamUsers
      .map((u) => {
        const raw = u.tenantRevenueSharePercent;
        const pct = raw != null ? Number(raw) : NaN;
        if (!Number.isFinite(pct) || pct <= 0) return null;
        const clamped = Math.min(100, Math.max(0, pct));
        return {
          memberId: u.id,
          memberName: u.name,
          role: u.role,
          percent: clamped,
          estimatedAmount: (contractRevenueBase * clamped) / 100,
        };
      })
      .filter((x): x is NonNullable<typeof x> => x != null);

    const contractualRevenueShares =
      user?.role === 'OWNER'
        ? contractRowsAll
        : user?.role === 'BARBER'
          ? contractRowsAll.filter((r) => r.memberId === user.sub)
          : [];

    return {
      date: start.toISOString().split('T')[0],
      billingModel: tenant.billingModel,
      barberId: filterBarberId ?? null,
      onlineRevenue: online.reduce((s, a) => s + Number(a.netAmount || 0), 0),
      manualRevenue: manual.reduce((s, a) => s + Number(a.netAmount || 0), 0),
      subscriptionRevenue: subRevenue,
      totalAppointments: appointments.length,
      onlineAppointments: online.length,
      manualAppointments: manual.length,
      noShows: appointments.filter((a) => a.status === 'NO_SHOW').length,
      platformFees: online.reduce((s, a) => s + Number(a.platformFee || 0), 0),
      ...(tenant.billingModel === BillingModel.OWNER_CUT_PERCENT
        ? {
            ownerShare,
            barberShare,
            barberBreakdown,
          }
        : {}),
      contractRevenueBase,
      ...(contractualRevenueShares.length > 0
        ? { contractualRevenueShares }
        : {}),
    };
  }
}
