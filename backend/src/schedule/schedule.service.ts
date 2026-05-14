import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { phoneDigitsForApi } from '@barbearia/phone-br';
import { endOfLocalCalendarDay, startOfLocalCalendarDay } from '../common/calendar-date';
import { PrismaService } from '../prisma/prisma.service';
import { TenantPrismaFactory } from '../prisma/tenant-prisma.factory';
import { CreateManualAppointmentDto, RescheduleAppointmentDto, UpdateAppointmentDetailsDto } from './dto/appointment.dto';
import { AppointmentStatus, Prisma } from '../generated/tenant-client';

interface TimeBlock {
  start: Date;
  end: Date;
}

interface WorkingHoursDay {
  open?: string;
  close?: string;
  /** Se true, o barbeiro não atende neste dia (mesmo com a barbearia aberta). */
  closed?: boolean;
  breaks?: { start: string; end: string }[];
}

@Injectable()
export class ScheduleService {
  constructor(
    private prisma: PrismaService,
    private tenantFactory: TenantPrismaFactory,
  ) {}

  // ── Cálculo de Slots Disponíveis ──────────────────────────────────────────

  async getAvailableSlots(
    tenantSlug: string,
    serviceId: string,
    date: string,
    userId?: string,
    barberId?: string,
  ) {
    if (!serviceId) throw new BadRequestException('Serviço não informado');

    // Lookup tenant from backoffice
    const tenant = await this.prisma.tenant.findUnique({
      where: { slug: tenantSlug },
      select: {
        id: true,
        status: true,
        workingHours: true,
        temporarilyClosed: true,
        separateCashRegisterEnabled: true,
        appointmentGapMinutes: true,
      },
    });
    if (!tenant) throw new NotFoundException('Barbearia não encontrada');

    if (tenant.status !== 'ACTIVE') {
      throw new BadRequestException('Barbearia indisponível para agendamentos');
    }

    const appointmentGapMinutesPublic = this.tenantAppointmentGapMinutesPublic(
      tenant.appointmentGapMinutes,
    );

    const db = this.tenantFactory.getClient(tenantSlug);

    const service = await db.service.findFirst({
      where: { id: serviceId, tenantId: tenant.id, active: true },
    });
    if (!service) throw new NotFoundException('Serviço não encontrado');

    const serviceDurationMinutes = Math.max(
      1,
      Math.min(480, Math.floor(Number(service.duration)) || 30),
    );

    const [year, month, day] = date.split('-').map(Number);
    const targetDate = new Date(year, month - 1, day);
    const dayName = this.getDayName(targetDate);

    const tenantHours = this.parseWorkingHoursJson(tenant.workingHours);
    const tenantDay = tenantHours[dayName];
    if (!tenantDay?.open || !tenantDay?.close) {
      return {
        slots: [],
        membershipContext: null,
        appointmentGapMinutes: appointmentGapMinutesPublic,
        serviceDurationMinutes,
      };
    }

    let effectiveBarberId: string | null = null;
    let barberDay: WorkingHoursDay | undefined;

    if (barberId) {
      // Barbers are in backoffice.users
      const barber = await this.prisma.user.findFirst({
        where: {
          id: barberId,
          tenantId: tenant.id,
          role: { in: ['OWNER', 'BARBER'] },
        },
        select: { id: true, workingHours: true, blocked: true },
      });
      if (!barber) throw new BadRequestException('Barbeiro inválido');
      if (barber.blocked) throw new BadRequestException('Este profissional não está disponível para agendamento');
      effectiveBarberId = barber.id;
      const barberHours = this.parseWorkingHoursJson(barber.workingHours);
      barberDay = barberHours[dayName];
    }

    const resolved = this.resolveDayWindow(targetDate, tenantDay, barberDay, !!barberId);
    if (!resolved) {
      return {
        slots: [],
        membershipContext: null,
        appointmentGapMinutes: appointmentGapMinutesPublic,
        serviceDurationMinutes,
      };
    }

    const { workStart, workEnd, breakBlocks } = resolved;

    const existingAppointments = await db.appointment.findMany({
      where: {
        tenantId: tenant.id,
        ...(effectiveBarberId ? { barberId: effectiveBarberId } : {}),
        status: { in: ['PENDING', 'CONFIRMED'] },
        startTime: { lt: workEnd },
        endTime: { gt: workStart },
      },
    });

    const gapMs = this.tenantAppointmentGapMs(tenant.appointmentGapMinutes);
    /** Grade de inícios a cada 30 min; cada slot usa a duração do serviço + intervalo só no bloqueio após o fim. */
    const slotStepMs = 30 * 60 * 1000;
    const appointmentBlocks: TimeBlock[] = existingAppointments.map((a) => ({
      start: a.startTime,
      end: new Date(a.endTime.getTime() + gapMs),
    }));

    const occupiedBlocks = [...breakBlocks, ...appointmentBlocks].sort(
      (a, b) => a.start.getTime() - b.start.getTime(),
    );

    const slotDuration = Number(service.duration) * 60 * 1000;
    const slots: { start: string; end: string; available: boolean }[] = [];

    // ── Verificar Fidelidade ───────────────────────────────────────────────
    let membershipContext = null;
    if (userId) {
      const dayOfWeek = targetDate.getDay();
      const separate = !!tenant.separateCashRegisterEnabled;
      const barberWhere = separate && barberId ? { barberId } : {};

      const activeSubscription = await db.loyaltySubscription.findFirst({
        where: {
          userId,
          status: 'ACTIVE',
          plan: {
            tenantId: tenant.id,
            items: { some: { serviceId } },
          },
          OR: [{ endDate: null }, { endDate: { gte: new Date() } }],
          ...barberWhere,
        },
        include: {
          plan: {
            include: {
              items: { where: { serviceId } },
            },
          },
          usages: { include: { appointment: { select: { serviceId: true } } } },
        },
      });

      if (activeSubscription) {
        const planItem = activeSubscription.plan.items[0];
        if (planItem) {
          const usedCount = activeSubscription.usages.filter(
            (u: any) => u?.appointment?.serviceId === serviceId,
          ).length;
          const totalCredits = planItem.quantity;
          const remainingCredits = Math.max(0, totalCredits - usedCount);
          const dayAllowed = planItem.allowedDays.includes(dayOfWeek);

          membershipContext = {
            subscriptionId: activeSubscription.id,
            planName: activeSubscription.plan.name,
            remainingCredits,
            totalCredits,
            usedCredits: usedCount,
            dayAllowed,
            isCovered: dayAllowed && remainingCredits > 0,
            isExhausted: remainingCredits <= 0,
          };
        }
      }
    }

    const now = new Date();
    const isTargetToday =
      targetDate.getFullYear() === now.getFullYear() &&
      targetDate.getMonth() === now.getMonth() &&
      targetDate.getDate() === now.getDate();

    let cursor = workStart;

    while (cursor.getTime() + slotDuration <= workEnd.getTime()) {
      const slotEnd = new Date(cursor.getTime() + slotDuration);

      const overlapsOccupied = occupiedBlocks.some(
        (block) => cursor < block.end && slotEnd > block.start,
      );

      const startedInPast = isTargetToday && cursor.getTime() < now.getTime();

      slots.push({
        start: cursor.toISOString(),
        end: slotEnd.toISOString(),
        available: !overlapsOccupied && !startedInPast,
      });

      cursor = new Date(cursor.getTime() + slotStepMs);
    }

    return {
      slots,
      membershipContext,
      appointmentGapMinutes: appointmentGapMinutesPublic,
      serviceDurationMinutes,
    };
  }

  // ── Agendamento Manual ────────────────────────────────────────────────────

  async createManual(currentUser: any, dto: CreateManualAppointmentDto) {
    const tenantId = currentUser.tenantId;
    const tenantSlug = currentUser.tenantSlug;
    const db = this.tenantFactory.getClient(tenantSlug);

    const service = await db.service.findFirst({
      where: { id: dto.serviceId, tenantId, active: true },
    });
    if (!service) throw new NotFoundException('Serviço não encontrado');

    const barberId =
      currentUser.role === 'BARBER'
        ? currentUser.sub
        : dto.barberId || null;

    let barberName: string | null = null;
    if (barberId) {
      const b = await this.prisma.user.findFirst({
        where: { id: barberId, tenantId, role: { in: ['OWNER', 'BARBER'] } },
        select: { name: true, blocked: true },
      });
      if (!b) throw new BadRequestException('Barbeiro inválido');
      if (b.blocked) throw new BadRequestException('Este profissional está bloqueado');
      barberName = b.name;
    }

    let userId: string | null = null;
    if (dto.userId) {
      const client = await this.prisma.user.findFirst({
        where: { id: dto.userId, tenantId, role: 'CLIENT' },
        select: { id: true },
      });
      if (!client) throw new BadRequestException('Cliente inválido');
      userId = client.id;
    }

    const startTime = new Date(dto.startTime);
    const endTime = new Date(startTime.getTime() + Number(service.duration) * 60 * 1000);

    // Dono não pode criar fora do horário normal; barbeiro pode (extraordinário)
    if (currentUser.role !== 'BARBER') {
      const tenant = await this.prisma.tenant.findUnique({
        where: { id: tenantId },
        select: { workingHours: true },
      });
      const dayName = this.getDayName(startTime);
      const tenantHours = this.parseWorkingHoursJson(tenant?.workingHours);
      const tenantDay = tenantHours[dayName];

      let barberDay: WorkingHoursDay | undefined;
      if (barberId) {
        const b = await this.prisma.user.findFirst({
          where: { id: barberId, tenantId, role: { in: ['OWNER', 'BARBER'] } },
          select: { workingHours: true },
        });
        barberDay = this.parseWorkingHoursJson(b?.workingHours)[dayName];
      }

      if (!tenantDay?.open || !tenantDay?.close) {
        throw new BadRequestException('Fora do horário de funcionamento');
      }
      const resolved = this.resolveDayWindow(startTime, tenantDay, barberDay, !!barberId);
      if (!resolved) throw new BadRequestException('Fora do horário de funcionamento');
      if (startTime < resolved.workStart || endTime > resolved.workEnd) {
        throw new BadRequestException('Fora do horário de funcionamento');
      }
      const overlapsBreak = resolved.breakBlocks.some((b) => startTime < b.end && endTime > b.start);
      if (overlapsBreak) throw new BadRequestException('Horário em pausa/folga');
    }

    await this.checkConflict(db, tenantId, startTime, endTime, barberId);

    const bookingSource =
      dto.bookingSource != null && String(dto.bookingSource).trim() !== ''
        ? String(dto.bookingSource).trim().slice(0, 120)
        : null;
    const clientEmailNorm = dto.clientEmail?.trim() ? dto.clientEmail.trim() : null;
    const clientPhoneNorm = dto.clientPhone?.trim() ? phoneDigitsForApi(dto.clientPhone) || null : null;

    // ── Consumo de plano de fidelidade (balcão) ────────────────────────────
    const shouldUseLoyalty =
      !!dto.loyaltySubscriptionId && !!userId && typeof dto.loyaltySubscriptionId === 'string';

    if (shouldUseLoyalty) {
      const tenantCfg = await this.prisma.tenant.findUnique({
        where: { id: tenantId },
        select: { separateCashRegisterEnabled: true },
      });
      const separate = !!tenantCfg?.separateCashRegisterEnabled;

      const sub = await db.loyaltySubscription.findFirst({
        where: {
          id: dto.loyaltySubscriptionId!,
          userId: userId!,
          status: 'ACTIVE',
          plan: {
            tenantId,
            items: { some: { serviceId: dto.serviceId } },
          },
          OR: [{ endDate: null }, { endDate: { gte: new Date() } }],
        },
        include: {
          plan: { include: { items: { where: { serviceId: dto.serviceId } } } },
          usages: { include: { appointment: { select: { serviceId: true } } } },
        },
      });
      if (!sub) throw new BadRequestException('Plano inválido, expirado ou não pertence a este cliente');

      const subBarberId = (sub as any).barberId as string | null | undefined;
      if (separate && subBarberId == null) {
        throw new BadRequestException(
          'Esta assinatura ainda não está vinculada a um profissional. Conclua o vínculo em Clientes antes de usar o plano.',
        );
      }
      if (separate && subBarberId && barberId && subBarberId !== barberId) {
        throw new BadRequestException('Esta assinatura pertence a outro profissional');
      }

      const planItem = sub.plan.items[0];
      if (!planItem) throw new BadRequestException('Serviço não faz parte deste plano');

      if (!planItem.allowedDays.includes(startTime.getDay())) {
        throw new BadRequestException('Este serviço não pode ser usado via plano neste dia da semana');
      }

      const usedCount = sub.usages.filter((u) => u.appointment?.serviceId === dto.serviceId).length;
      if (usedCount >= planItem.quantity) {
        throw new BadRequestException('Plano já foi totalmente consumido para este serviço');
      }

      return db.appointment.create({
        data: {
          tenantId,
          tenantSlug,
          serviceId: dto.serviceId,
          barberId,
          barberName,
          userId,
          clientName: dto.clientName,
          clientPhone: clientPhoneNorm,
          clientEmail: clientEmailNorm,
          startTime,
          endTime,
          status: 'CONFIRMED',
          type: 'MANUAL',
          notes: dto.notes,
          bookingSource,
          netAmount: 0,
          platformFee: 0,
          loyaltyUsage: {
            create: { subscriptionId: sub.id },
          },
        },
        include: {
          service: true,
          loyaltyUsage: {
            include: {
              subscription: { include: { plan: { select: { id: true, name: true } } } },
            },
          },
        },
      });
    }

    return db.appointment.create({
      data: {
        tenantId,
        tenantSlug,
        serviceId: dto.serviceId,
        barberId,
        barberName,
        userId,
        clientName: dto.clientName,
        clientPhone: clientPhoneNorm,
        clientEmail: clientEmailNorm,
        startTime,
        endTime,
        status: 'CONFIRMED',
        type: 'MANUAL',
        notes: dto.notes,
        bookingSource,
        netAmount: service.price,
        platformFee: 0,
      },
      include: {
        service: true,
        loyaltyUsage: {
          include: {
            subscription: { include: { plan: { select: { id: true, name: true } } } },
          },
        },
      },
    });
  }

  // ── Listagem e Gestão ─────────────────────────────────────────────────────

  async findAll(
    tenantId: string,
    tenantSlug: string,
    date?: string,
    dateFrom?: string,
    dateTo?: string,
    status?: AppointmentStatus,
    barberId?: string,
  ) {
    const db = this.tenantFactory.getClient(tenantSlug);
    const where: any = { tenantId };

    if (dateFrom && dateTo) {
      const from = startOfLocalCalendarDay(dateFrom);
      const to = endOfLocalCalendarDay(dateTo);
      where.startTime = { gte: from, lte: to };
    } else if (date) {
      const [y, m, d] = date.split('-').map(Number);
      const start = new Date(y, m - 1, d, 0, 0, 0, 0);
      const end = new Date(y, m - 1, d, 23, 59, 59, 999);
      where.startTime = { gte: start, lte: end };
    }
    if (status) where.status = status;
    if (barberId) where.barberId = barberId;

    const list = await db.appointment.findMany({
      where,
      include: {
        service: true,
        loyaltyUsage: {
          include: {
            subscription: {
              include: {
                plan: { select: { id: true, name: true } },
              },
            },
          },
        },
      },
      orderBy: { startTime: 'asc' },
    });
    return this.attachClientTeamNotes(tenantId, list);
  }

  /** Notas internas da equipe (backoffice) anexadas por cliente vinculado (userId). */
  private async attachClientTeamNotes(tenantId: string, appointments: any[]) {
    const userIds = [...new Set(appointments.map((a) => a.userId).filter(Boolean))] as string[];
    if (!userIds.length) {
      return appointments.map((a) => ({ ...a, clientTeamNotes: [] }));
    }
    const notes = await this.prisma.clientTeamNote.findMany({
      where: { tenantId, clientUserId: { in: userIds } },
      orderBy: { createdAt: 'desc' },
      take: 500,
    });
    const authorIds = [...new Set(notes.map((n) => n.authorUserId))];
    const authors = await this.prisma.user.findMany({
      where: { id: { in: authorIds }, tenantId },
      select: { id: true, name: true },
    });
    const nameById = new Map(authors.map((a) => [a.id, a.name]));
    const byClient = new Map<string, any[]>();
    for (const n of notes) {
      const arr = byClient.get(n.clientUserId) ?? [];
      if (arr.length >= 12) continue;
      arr.push({
        id: n.id,
        body: n.body,
        authorUserId: n.authorUserId,
        authorName: nameById.get(n.authorUserId) ?? '—',
        createdAt: n.createdAt,
      });
      byClient.set(n.clientUserId, arr);
    }
    return appointments.map((a) => ({
      ...a,
      clientTeamNotes: a.userId ? (byClient.get(a.userId) ?? []) : [],
    }));
  }

  async updateStatus(id: string, currentUser: any, status: AppointmentStatus, reason: string) {
    const tenantId = currentUser.tenantId;
    const tenantSlug = currentUser.tenantSlug;
    const db = this.tenantFactory.getClient(tenantSlug);
    const appointment = await db.appointment.findFirst({ where: { id, tenantId } });
    if (!appointment) throw new NotFoundException('Agendamento não encontrado');
    const safeReason = (reason || '').trim();
    if (!safeReason) throw new BadRequestException('Motivo é obrigatório');

    const logLine = this.buildAppointmentChangeLogLine(currentUser, safeReason, {
      action: 'status',
      from: appointment.status,
      to: status,
    });

    return db.appointment.update({
      where: { id },
      data: { status, notes: this.appendNote(appointment.notes, logLine) },
    });
  }

  private async checkConflictComandaSegments(
    db: any,
    tenantId: string,
    startTime: Date,
    lines: { serviceId: string; barberId: string | null }[],
    serviceById: Map<string, { duration: number }>,
    anchorBarberId: string | null | undefined,
    excludeAppointmentId?: string,
  ) {
    let cursor = new Date(startTime);
    for (const line of lines) {
      const svc = serviceById.get(line.serviceId);
      if (!svc) throw new BadRequestException('Serviço inválido na comanda');
      const durMs = Number(svc.duration) * 60 * 1000;
      const end = new Date(cursor.getTime() + durMs);
      const bid =
        line.barberId != null && String(line.barberId).trim() !== ''
          ? String(line.barberId).trim()
          : anchorBarberId ?? undefined;
      await this.checkConflict(db, tenantId, cursor, end, bid, excludeAppointmentId);
      cursor = end;
    }
  }

  async updateAppointmentDetails(id: string, currentUser: any, dto: UpdateAppointmentDetailsDto) {
    const tenantId = currentUser.tenantId;
    const tenantSlug = currentUser.tenantSlug;
    const db = this.tenantFactory.getClient(tenantSlug);

    const appointment = await db.appointment.findFirst({
      where: { id, tenantId },
      include: {
        loyaltyUsage: { select: { id: true } },
        service: true,
      },
    });
    if (!appointment) throw new NotFoundException('Agendamento não encontrado');
    if (appointment.status === 'CANCELLED') {
      throw new BadRequestException('Agendamento cancelado não pode ser editado');
    }

    if (currentUser.role === 'BARBER' && appointment.barberId !== currentUser.sub) {
      throw new ForbiddenException('Sem permissão para editar este agendamento');
    }

    const safeReason = (dto.reason || '').trim();
    if (!safeReason) throw new BadRequestException('Motivo é obrigatório');

    const hasLoyalty = !!appointment.loyaltyUsage;
    const curHold = String(appointment.holdKind || 'NONE');

    const wantsClient =
      dto.clientName !== undefined || dto.clientPhone !== undefined || dto.clientEmail !== undefined;
    const wantsService = dto.serviceId !== undefined;
    const wantsExtras = dto.additionalServiceIds !== undefined;
    const wantsHoldKind = dto.holdKind !== undefined;
    const wantsComanda = dto.comandaLines !== undefined;
    const wantsBookingSource = dto.bookingSource !== undefined;

    if (
      !wantsClient &&
      !wantsService &&
      !wantsExtras &&
      !wantsHoldKind &&
      !wantsComanda &&
      !wantsBookingSource
    ) {
      throw new BadRequestException(
        'Informe ao menos um campo para alterar (cliente, serviços, comanda, origem, folga/bloqueio ou tipo de reserva)',
      );
    }

    if (curHold !== 'NONE' && dto.holdKind === undefined) {
      if (wantsClient || wantsService || wantsExtras || wantsComanda) {
        throw new BadRequestException(
          'Este horário está como folga ou bloqueio. Defina o tipo como "Atendimento normal" no mesmo salvamento para editar cliente, serviços ou comanda.',
        );
      }
    }

    if (hasLoyalty && wantsClient) {
      throw new BadRequestException('Não é possível alterar dados do cliente em atendimento via fidelidade');
    }
    if (hasLoyalty && (dto.holdKind === 'LEAVE' || dto.holdKind === 'BLOCK')) {
      throw new BadRequestException('Não é possível marcar folga/bloqueio em atendimento via fidelidade');
    }

    const startTime = new Date(appointment.startTime);

    // ── Folga / bloqueio ─────────────────────────────────────────────────
    if (dto.holdKind === 'LEAVE' || dto.holdKind === 'BLOCK') {
      if (hasLoyalty) throw new BadRequestException('Folga/bloqueio não se aplica a fidelidade');
      const note = (dto.holdReason || '').trim();
      if (!note) {
        throw new BadRequestException('Informe o motivo descritivo para folga ou bloqueio');
      }
      const mainSvc = await db.service.findFirst({
        where: { id: appointment.serviceId, tenantId, active: true },
      });
      if (!mainSvc) throw new NotFoundException('Serviço não encontrado');
      const totalMs = Number(mainSvc.duration) * 60 * 1000;
      const newEndTime = new Date(startTime.getTime() + totalMs);
      await this.checkConflict(
        db,
        tenantId,
        startTime,
        newEndTime,
        appointment.barberId ?? undefined,
        id,
      );
      const logLine = this.buildAppointmentChangeLogLine(currentUser, safeReason, {
        action: 'hold',
        from: curHold,
        to: `${dto.holdKind}:${note.slice(0, 40)}`,
      });
      return db.appointment.update({
        where: { id },
        data: {
          holdKind: dto.holdKind,
          holdReason: note,
          clientName: dto.holdKind === 'LEAVE' ? 'Folga' : 'Bloqueio',
          comandaLines: Prisma.JsonNull,
          additionalServiceIds: [],
          endTime: newEndTime,
          netAmount: appointment.type === 'MANUAL' ? 0 : appointment.netAmount,
          notes: this.appendNote(appointment.notes, logLine),
        } as any,
        include: {
          service: true,
          loyaltyUsage: {
            include: {
              subscription: { include: { plan: { select: { id: true, name: true } } } },
            },
          },
        },
      });
    }

    const data: Record<string, unknown> = {};

    if (dto.holdKind === 'NONE') {
      data.holdKind = 'NONE';
      data.holdReason = null;
    }

    // ── Comanda (linhas com serviço + barbeiro) ───────────────────────────
    let comandaRows: { serviceId: string; barberId: string | null }[] = [];
    if (dto.comandaLines !== undefined) {
      if (hasLoyalty) throw new BadRequestException('Comanda não está disponível para atendimento via fidelidade');
      if (curHold !== 'NONE' && dto.holdKind !== 'NONE') {
        throw new BadRequestException('Saia do modo folga/bloqueio antes de editar a comanda');
      }
      const raw = dto.comandaLines;
      if (!Array.isArray(raw)) throw new BadRequestException('comandaLines inválido');
      if (raw.length === 0) {
        data.comandaLines = Prisma.JsonNull;
      } else {
        comandaRows = raw.map((row: any) => ({
          serviceId: String(row.serviceId || '').trim(),
          barberId:
            row.barberId != null && String(row.barberId).trim() !== ''
              ? String(row.barberId).trim()
              : null,
        }));
        if (comandaRows.some((r) => !r.serviceId)) {
          throw new BadRequestException('Cada linha da comanda precisa de serviço');
        }
        const svcIds = [...new Set(comandaRows.map((r) => r.serviceId))];
        const svcRows = await db.service.findMany({
          where: { tenantId, active: true, id: { in: svcIds } },
          select: { id: true, duration: true, price: true },
        });
        if (svcRows.length !== svcIds.length) {
          throw new BadRequestException('Um ou mais serviços da comanda são inválidos');
        }
        const byId = new Map(svcRows.map((s: any) => [s.id, { duration: Number(s.duration), price: Number(s.price) }]));
        const barberIds = [...new Set(comandaRows.map((r) => r.barberId).filter((b): b is string => !!b))];
        for (const bid of barberIds) {
          const u = await this.prisma.user.findFirst({
            where: { id: bid, tenantId, role: { in: ['OWNER', 'BARBER'] } },
            select: { id: true, blocked: true },
          });
          if (!u) throw new BadRequestException(`Profissional inválido na comanda: ${bid}`);
          if (u.blocked) throw new BadRequestException('Profissional bloqueado na comanda');
        }
        const anchor = comandaRows[0].barberId || appointment.barberId || null;
        await this.checkConflictComandaSegments(
          db,
          tenantId,
          startTime,
          comandaRows,
          byId,
          anchor,
          id,
        );
        const totalMinutes = comandaRows.reduce((acc, r) => acc + (byId.get(r.serviceId)?.duration ?? 0), 0);
        const newEndTime = new Date(startTime.getTime() + totalMinutes * 60 * 1000);
        const firstBarberId = comandaRows[0].barberId || appointment.barberId;
        let barberName: string | null = appointment.barberName;
        if (firstBarberId) {
          const bn = await this.prisma.user.findFirst({
            where: { id: firstBarberId, tenantId, role: { in: ['OWNER', 'BARBER'] } },
            select: { name: true },
          });
          barberName = bn?.name ?? null;
        } else {
          barberName = null;
        }
        data.serviceId = comandaRows[0].serviceId;
        data.barberId = firstBarberId;
        data.barberName = barberName;
        data.additionalServiceIds = [];
        data.comandaLines = comandaRows as unknown as Prisma.InputJsonValue;
        data.endTime = newEndTime;
        if (!hasLoyalty && appointment.type === 'MANUAL') {
          const priceSum = comandaRows.reduce((acc, r) => acc + (byId.get(r.serviceId)?.price ?? 0), 0);
          data.netAmount = priceSum;
        }
      }
    }

    // ── Modelo clássico (sem comanda com linhas) ───────────────────────────
    const usedComandaWithRows =
      dto.comandaLines !== undefined && Array.isArray(dto.comandaLines) && dto.comandaLines.length > 0;
    if (!usedComandaWithRows) {
        let serviceId = appointment.serviceId;
        if (dto.serviceId !== undefined && dto.serviceId !== appointment.serviceId) {
          if (hasLoyalty) {
            throw new BadRequestException('Não é possível trocar o serviço principal de um atendimento via plano de fidelidade');
          }
          const s = await db.service.findFirst({
            where: { id: dto.serviceId, tenantId, active: true },
          });
          if (!s) throw new BadRequestException('Serviço principal inválido');
          serviceId = dto.serviceId;
        }

        const existingExtras = appointment.additionalServiceIds;
        let additionalServiceIds = Array.isArray(existingExtras) ? [...existingExtras] : [];
        if (dto.additionalServiceIds !== undefined) {
          if (hasLoyalty && dto.additionalServiceIds.length > 0) {
            throw new BadRequestException('Serviços extras não são permitidos em atendimento coberto por fidelidade');
          }
          const uniq = [...new Set(dto.additionalServiceIds.filter((x) => !!String(x).trim()))].filter(
            (sid) => sid !== serviceId,
          );
          if (uniq.length) {
            const found = await db.service.count({
              where: { tenantId, active: true, id: { in: uniq } },
            });
            if (found !== uniq.length) throw new BadRequestException('Um ou mais serviços adicionais inválidos');
          }
          additionalServiceIds = uniq;
        }

        const mainSvc = await db.service.findFirst({ where: { id: serviceId, tenantId, active: true } });
        if (!mainSvc) throw new NotFoundException('Serviço principal não encontrado');

        const extras =
          additionalServiceIds.length > 0
            ? await db.service.findMany({
                where: { tenantId, id: { in: additionalServiceIds }, active: true },
              })
            : [];
        if (extras.length !== additionalServiceIds.length) {
          throw new BadRequestException('Serviços adicionais inconsistentes');
        }

        const totalMinutes =
          Number(mainSvc.duration) + extras.reduce((acc, s) => acc + Number(s.duration), 0);
        const newEndTime = new Date(startTime.getTime() + totalMinutes * 60 * 1000);

        await this.checkConflict(
          db,
          tenantId,
          startTime,
          newEndTime,
          appointment.barberId ?? undefined,
          id,
        );

        data.serviceId = serviceId;
        data.additionalServiceIds = additionalServiceIds;
        data.endTime = newEndTime;
        if (dto.comandaLines !== undefined && Array.isArray(dto.comandaLines) && dto.comandaLines.length === 0) {
          data.comandaLines = Prisma.JsonNull;
        }
        if (!hasLoyalty && appointment.type === 'MANUAL') {
          const priceSum = Number(mainSvc.price) + extras.reduce((acc, s) => acc + Number(s.price), 0);
          data.netAmount = priceSum;
        }
    }

    if (dto.clientName !== undefined) {
      const n = dto.clientName.trim();
      if (!n) throw new BadRequestException('Nome do cliente não pode ficar vazio');
      data.clientName = n;
    }
    if (dto.clientPhone !== undefined) {
      const p = dto.clientPhone.trim() ? phoneDigitsForApi(dto.clientPhone) : '';
      data.clientPhone = p || null;
    }
    if (dto.clientEmail !== undefined) {
      data.clientEmail = dto.clientEmail.trim() ? dto.clientEmail.trim() : null;
    }
    if (dto.bookingSource !== undefined) {
      const v = String(dto.bookingSource).trim().slice(0, 120);
      data.bookingSource = v || null;
    }

    const fromSvc = `${appointment.serviceId}|${JSON.stringify(appointment.additionalServiceIds)}|${curHold}`;
    const toSvc = `${String(data.serviceId ?? appointment.serviceId)}|${JSON.stringify(data.additionalServiceIds ?? appointment.additionalServiceIds)}|${String(data.holdKind ?? curHold)}`;
    const logLine = this.buildAppointmentChangeLogLine(currentUser, safeReason, {
      action: 'details',
      from: fromSvc,
      to: toSvc,
    });
    data.notes = this.appendNote(appointment.notes, logLine);

    return db.appointment.update({
      where: { id },
      data: data as any,
      include: {
        service: true,
        loyaltyUsage: {
          include: {
            subscription: { include: { plan: { select: { id: true, name: true } } } },
          },
        },
      },
    });
  }

  async reschedule(id: string, currentUser: any, dto: RescheduleAppointmentDto) {
    const tenantId = currentUser.tenantId;
    const tenantSlug = currentUser.tenantSlug;
    const db = this.tenantFactory.getClient(tenantSlug);

    const appointment = await db.appointment.findFirst({
      where: { id, tenantId },
      include: {
        loyaltyUsage: {
          include: {
            subscription: { select: { id: true, barberId: true, status: true } },
          },
        },
      },
    });
    if (!appointment) throw new NotFoundException('Agendamento não encontrado');

    if (appointment.status !== 'PENDING' && appointment.status !== 'CONFIRMED') {
      throw new BadRequestException('Apenas agendamentos pendentes/confirmados podem ser remarcados');
    }

    const safeReason = (dto.reason || '').trim();
    if (!safeReason) throw new BadRequestException('Motivo é obrigatório');

    const normalizedBarberIdRaw =
      dto.barberId !== undefined ? String(dto.barberId).trim() : undefined;
    const requestedBarberId =
      normalizedBarberIdRaw === '' ? null : normalizedBarberIdRaw ?? undefined;

    const actorIsBarber = currentUser.role === 'BARBER';
    const actorId = currentUser.sub;

    // Resolve barberId final respeitando permissões
    let newBarberId: string | null = appointment.barberId ?? null;
    if (actorIsBarber) {
      // barbeiro só pode mover para si mesmo
      newBarberId = actorId;
      if (requestedBarberId && requestedBarberId !== actorId) {
        throw new BadRequestException('Você não pode mover agendamentos para outro profissional');
      }
      if (requestedBarberId === null) {
        throw new BadRequestException('Você não pode remover o profissional do agendamento');
      }
    } else {
      // OWNER pode trocar ou remover
      if (requestedBarberId !== undefined) newBarberId = requestedBarberId;
    }

    let newBarberName: string | null = null;
    if (newBarberId) {
      const barber = await this.prisma.user.findFirst({
        where: { id: newBarberId, tenantId, role: { in: ['OWNER', 'BARBER'] } },
        select: { id: true, blocked: true, name: true },
      });
      if (!barber) throw new BadRequestException('Barbeiro inválido');
      if (barber.blocked) throw new BadRequestException('Este profissional está bloqueado');
      newBarberName = barber.name;
    }

    // Regra fidelidade (quando separar por barbeiro)
    const hasLoyalty = !!appointment.loyaltyUsage?.subscription?.id;
    if (hasLoyalty) {
      const tenantCfg = await this.prisma.tenant.findUnique({
        where: { id: tenantId },
        select: { separateCashRegisterEnabled: true },
      });
      const separate = !!tenantCfg?.separateCashRegisterEnabled;
      if (separate) {
        const sub = appointment.loyaltyUsage!.subscription as { barberId: string | null };
        if (sub.barberId == null) {
          throw new BadRequestException(
            'Esta assinatura ainda não está vinculada a um profissional. Conclua o vínculo em Clientes antes de remarcar.',
          );
        }
        if (newBarberId && sub.barberId !== newBarberId) {
          throw new BadRequestException('Este agendamento via plano pertence a outro profissional');
        }
        if (!newBarberId) {
          throw new BadRequestException('Agendamento via plano precisa ter um profissional');
        }
      }
    }

    const durationMs =
      new Date(appointment.endTime).getTime() - new Date(appointment.startTime).getTime();
    if (!Number.isFinite(durationMs) || durationMs <= 0) {
      throw new BadRequestException('Duração inválida do agendamento');
    }

    const newStartTime = new Date(dto.startTime);
    if (Number.isNaN(newStartTime.getTime())) {
      throw new BadRequestException('startTime inválido');
    }
    const newEndTime = new Date(newStartTime.getTime() + durationMs);

    // Remarcação pode ser em horário extraordinário (fora da loja / pausa / expediente do barbeiro).
    // O motivo obrigatório no painel registra a decisão; conflitos na grade seguem bloqueados abaixo.

    await this.checkConflict(db, tenantId, newStartTime, newEndTime, newBarberId, id);

    const fromLabel = `${appointment.barberId ?? '—'} ${appointment.startTime.toISOString()}`;
    const toLabel = `${newBarberId ?? '—'} ${newStartTime.toISOString()}`;
    const logLine = this.buildAppointmentChangeLogLine(currentUser, safeReason, {
      action: 'reschedule',
      from: fromLabel,
      to: toLabel,
    });

    return db.appointment.update({
      where: { id },
      data: {
        startTime: newStartTime,
        endTime: newEndTime,
        barberId: newBarberId,
        barberName: newBarberName,
        notes: this.appendNote(appointment.notes, logLine),
      },
      include: {
        service: true,
        loyaltyUsage: {
          include: {
            subscription: { include: { plan: { select: { id: true, name: true } } } },
          },
        },
      },
    });
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  private resolveDayWindow(
    targetDate: Date,
    tenantDay: WorkingHoursDay,
    barberDay: WorkingHoursDay | undefined,
    hasBarber: boolean,
  ): { workStart: Date; workEnd: Date; breakBlocks: TimeBlock[] } | null {
    const tS = this.parseTime(targetDate, tenantDay.open!);
    const tE = this.parseTime(targetDate, tenantDay.close!);
    if (tS.getTime() >= tE.getTime()) return null;

    if (!hasBarber) {
      const breakBlocks = this.mergeBreaksInWindow(targetDate, tenantDay.breaks, tS, tE);
      return { workStart: tS, workEnd: tE, breakBlocks };
    }

    if (barberDay?.closed === true) return null;

    if (barberDay?.open && barberDay?.close) {
      const bS = this.parseTime(targetDate, barberDay.open);
      const bE = this.parseTime(targetDate, barberDay.close);
      const workStart = new Date(Math.max(tS.getTime(), bS.getTime()));
      const workEnd = new Date(Math.min(tE.getTime(), bE.getTime()));
      if (workStart.getTime() >= workEnd.getTime()) return null;
      const fromTenant = this.mergeBreaksInWindow(targetDate, tenantDay.breaks, workStart, workEnd);
      const fromBarber = this.mergeBreaksInWindow(targetDate, barberDay.breaks, workStart, workEnd);
      const breakBlocks = [...fromTenant, ...fromBarber].sort(
        (a, b) => a.start.getTime() - b.start.getTime(),
      );
      return { workStart, workEnd, breakBlocks };
    }

    const breakBlocks = this.mergeBreaksInWindow(targetDate, tenantDay.breaks, tS, tE);
    return { workStart: tS, workEnd: tE, breakBlocks };
  }

  private parseWorkingHoursJson(raw: unknown): Record<string, WorkingHoursDay> {
    let o: any = raw;
    if (typeof o === 'string') {
      try {
        o = JSON.parse(o);
      } catch {
        o = {};
      }
    }
    if (!o || typeof o !== 'object') return {};
    return o as Record<string, WorkingHoursDay>;
  }

  private clipBlockToWindow(block: TimeBlock, winStart: Date, winEnd: Date): TimeBlock | null {
    const s = new Date(Math.max(block.start.getTime(), winStart.getTime()));
    const e = new Date(Math.min(block.end.getTime(), winEnd.getTime()));
    if (s.getTime() < e.getTime()) return { start: s, end: e };
    return null;
  }

  private mergeBreaksInWindow(
    targetDate: Date,
    breaks: { start: string; end: string }[] | undefined,
    winStart: Date,
    winEnd: Date,
  ): TimeBlock[] {
    const out: TimeBlock[] = [];
    for (const b of breaks || []) {
      if (!b?.start || !b?.end) continue;
      const bs = this.parseTime(targetDate, b.start);
      const be = this.parseTime(targetDate, b.end);
      const clipped = this.clipBlockToWindow({ start: bs, end: be }, winStart, winEnd);
      if (clipped) out.push(clipped);
    }
    return out;
  }

  private getDayName(date: Date): string {
    const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    return days[date.getDay()];
  }

  private parseTime(date: Date, time: string): Date {
    const [hours, minutes] = time.split(':').map(Number);
    const result = new Date(date);
    result.setHours(hours, minutes, 0, 0);
    return result;
  }

  /** Minutos configurados para a UI / JSON (0 = desligado; null → 5). */
  private tenantAppointmentGapMinutesPublic(minutes: number | null | undefined): number {
    if (minutes == null) return 5;
    const n = Math.floor(Number(minutes));
    if (!Number.isFinite(n) || n < 0) return 5;
    return Math.min(120, n);
  }

  /**
   * Minutos reservados após cada atendimento (troca / deslocamento).
   * `null`/`undefined` → 5 (padrão). 0 = sem intervalo extra.
   */
  private tenantAppointmentGapMs(minutes: number | null | undefined): number {
    const m = minutes == null ? 5 : Math.floor(Number(minutes));
    if (!Number.isFinite(m) || m < 0) return 5 * 60 * 1000;
    return Math.min(m, 120) * 60 * 1000;
  }

  private async checkConflict(
    db: any,
    tenantId: string,
    startTime: Date,
    endTime: Date,
    barberId?: string | null,
    excludeAppointmentId?: string,
  ) {
    const tenantCfg = await this.prisma.tenant.findUnique({
      where: { id: tenantId },
      select: { appointmentGapMinutes: true },
    });
    const gapMs = this.tenantAppointmentGapMs(tenantCfg?.appointmentGapMinutes);

    const candidates = await db.appointment.findMany({
      where: {
        tenantId,
        ...(barberId ? { barberId } : {}),
        status: { in: ['PENDING', 'CONFIRMED'] },
        ...(excludeAppointmentId ? { id: { not: excludeAppointmentId } } : {}),
        startTime: { lt: endTime },
        endTime: { gt: new Date(startTime.getTime() - gapMs) },
      },
      select: { id: true, startTime: true, endTime: true },
    });

    for (const c of candidates) {
      const blockEnd = new Date(c.endTime.getTime() + gapMs);
      if (startTime.getTime() < blockEnd.getTime() && endTime.getTime() > c.startTime.getTime()) {
        throw new BadRequestException('Horário já ocupado');
      }
    }
  }

  /** Pagamentos e outros fluxos que criam reserva fora do controller de agenda. */
  async ensureNoScheduleConflict(
    tenantSlug: string,
    tenantId: string,
    startTime: Date,
    endTime: Date,
    barberId: string | null | undefined,
    excludeAppointmentId?: string,
  ) {
    const db = this.tenantFactory.getClient(tenantSlug);
    await this.checkConflict(db, tenantId, startTime, endTime, barberId ?? null, excludeAppointmentId);
  }

  private appendNote(existing: string | null | undefined, line: string) {
    const base = (existing || '').trim();
    if (!base) return line;
    return `${base}\n${line}`;
  }

  private buildAppointmentChangeLogLine(
    actor: any,
    reason: string,
    meta: { action: string; from: string; to: string },
  ) {
    const at = new Date().toISOString();
    const who = `${actor?.role ?? 'USER'}:${actor?.sub ?? 'unknown'}`;
    const safeReason = reason.replace(/\s+/g, ' ').trim();
    return `[${at}] ${who} ${meta.action} (${meta.from} -> ${meta.to}) motivo: ${safeReason}`;
  }
}
