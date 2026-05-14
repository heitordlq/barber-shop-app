import { Controller, Get, Post, Patch, Body, BadRequestException, ForbiddenException, UseGuards, Query, Param } from '@nestjs/common';
import { UpdateTeamMemberDto } from './dto/team-member.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { phoneDigitsForApi } from '@barbearia/phone-br';
import { PrismaService } from '../prisma/prisma.service';
import { TenantPrismaFactory } from '../prisma/tenant-prisma.factory';
import * as bcrypt from 'bcryptjs';

@Controller('tenant-users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TenantUsersController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tenantFactory: TenantPrismaFactory,
  ) {}

  @Roles('OWNER', 'BARBER')
  @Get('equipe')
  async getTeam(@CurrentUser() user: any) {
    return this.prisma.user.findMany({
      where: {
        tenantId: user.tenantId,
        role: { in: ['OWNER', 'BARBER'] },
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phone: true,
        workingHours: true,
        blocked: true,
        createdAt: true,
        ownerCutPercentOverride: true,
        tenantRevenueSharePercent: true,
        separateCashRegister: true,
      },
    });
  }

  @Roles('OWNER')
  @Patch('equipe/:id')
  async updateTeamMember(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() dto: UpdateTeamMemberDto,
  ) {
    const member = await this.prisma.user.findFirst({
      where: { id, tenantId: user.tenantId, role: 'BARBER' },
    });
    if (!member) throw new BadRequestException('Barbeiro não encontrado');

    if (dto.email && dto.email !== member.email) {
      const taken = await this.prisma.user.findUnique({ where: { email: dto.email } });
      if (taken) throw new BadRequestException('Este email já está em uso');
    }

    let ownerCut: number | null | undefined = undefined;
    if (dto.ownerCutPercentOverride !== undefined) {
      ownerCut = dto.ownerCutPercentOverride === -1 ? null : dto.ownerCutPercentOverride;
    }

    let tenantRevShare: number | null | undefined = undefined;
    if (dto.tenantRevenueSharePercent !== undefined) {
      tenantRevShare = dto.tenantRevenueSharePercent === -1 ? null : dto.tenantRevenueSharePercent;
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        ...(dto.name !== undefined ? { name: dto.name } : {}),
        ...(dto.email !== undefined ? { email: dto.email } : {}),
        ...(dto.phone !== undefined
          ? { phone: dto.phone?.trim() ? phoneDigitsForApi(dto.phone) || null : null }
          : {}),
        ...(ownerCut !== undefined ? { ownerCutPercentOverride: ownerCut } : {}),
        ...(tenantRevShare !== undefined ? { tenantRevenueSharePercent: tenantRevShare } : {}),
        ...(dto.separateCashRegister !== undefined ? { separateCashRegister: dto.separateCashRegister } : {}),
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        blocked: true,
        createdAt: true,
        ownerCutPercentOverride: true,
        tenantRevenueSharePercent: true,
        separateCashRegister: true,
      },
    });
  }

  @Roles('OWNER')
  @Patch('equipe/:id/senha')
  async resetTeamMemberPassword(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() dto: { newPassword: string },
  ) {
    if (!dto.newPassword || dto.newPassword.length < 6) {
      throw new BadRequestException('Senha deve ter pelo menos 6 caracteres');
    }

    const member = await this.prisma.user.findFirst({
      where: { id, tenantId: user.tenantId, role: 'BARBER' },
    });
    if (!member) throw new BadRequestException('Barbeiro não encontrado');

    const hashed = await bcrypt.hash(dto.newPassword, 12);
    await this.prisma.user.update({
      where: { id },
      data: {
        password: hashed,
        refreshToken: null,
      },
    });

    return { success: true };
  }

  @Roles('OWNER')
  @Patch('equipe/:id/blocked')
  async setTeamMemberBlocked(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() dto: { blocked: boolean },
  ) {
    if (user.sub === id) {
      throw new BadRequestException('Você não pode bloquear a própria conta');
    }

    const member = await this.prisma.user.findFirst({
      where: { id, tenantId: user.tenantId, role: 'BARBER' },
    });
    if (!member) throw new BadRequestException('Barbeiro não encontrado');

    if (dto.blocked) {
      await this.prisma.user.update({
        where: { id },
        data: { blocked: true, refreshToken: null },
      });
    } else {
      await this.prisma.user.update({
        where: { id },
        data: { blocked: false },
      });
    }

    return this.prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, blocked: true },
    });
  }

  @Roles('OWNER')
  @Post('equipe')
  async addTeamMember(
    @CurrentUser() user: any,
    @Body() dto: { name: string; email: string; phone?: string; role?: 'BARBER' },
  ) {
    if (!dto.name || !dto.email) {
      throw new BadRequestException('Nome e email são obrigatórios');
    }

    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) {
      throw new BadRequestException('Já existe um usuário com este email');
    }

    const tenant = await this.prisma.tenant.findUnique({
      where: { id: user.tenantId },
      include: { plan: true },
    });
    if (!tenant) throw new BadRequestException('Tenant inválido');

    if ((tenant as any).plan?.maxTeamMembers != null) {
      const memberCount = await this.prisma.user.count({
        where: { tenantId: user.tenantId, role: { in: ['OWNER', 'BARBER'] } },
      });
      if (memberCount >= (tenant as any).plan.maxTeamMembers) {
        throw new ForbiddenException(
          `Seu plano permite no máximo ${(tenant as any).plan.maxTeamMembers} membro(s) de equipe. Faça um upgrade para adicionar mais.`,
        );
      }
    }

    const tempPassword = Math.random().toString(36).slice(2, 10);
    const hashedPassword = await bcrypt.hash(tempPassword, 12);

    const created = await this.prisma.user.create({
      data: {
        tenantId: user.tenantId,
        tenantSlug: user.tenantSlug,
        name: dto.name,
        email: dto.email,
        phone: dto.phone?.trim() ? phoneDigitsForApi(dto.phone) || null : null,
        role: dto.role ?? 'BARBER',
        password: hashedPassword,
        workingHours: (tenant.workingHours ?? {}) as any,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
      },
    });

    return { user: created, tempPassword };
  }

  @Roles('OWNER', 'BARBER')
  @Patch('equipe/:id/working-hours')
  async updateWorkingHours(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() dto: { workingHours: any },
  ) {
    if (!dto.workingHours) throw new BadRequestException('workingHours é obrigatório');

    const member = await this.prisma.user.findFirst({
      where: { id, tenantId: user.tenantId, role: { in: ['OWNER', 'BARBER'] } },
      select: { id: true, role: true },
    });
    if (!member) throw new BadRequestException('Membro não encontrado');

    // Barbeiro só pode editar o próprio horário; owner pode editar todos
    if (user.role !== 'OWNER' && user.sub !== id) {
      throw new ForbiddenException('Sem permissão para editar este membro');
    }

    return this.prisma.user.update({
      where: { id },
      data: { workingHours: dto.workingHours },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        workingHours: true,
      },
    });
  }

  @Roles('OWNER', 'BARBER')
  @Get('clientes/:id/notas-equipe')
  async getClientTeamNotes(@CurrentUser() user: any, @Param('id') id: string) {
    const client = await this.prisma.user.findFirst({
      where: { id, tenantId: user.tenantId, role: 'CLIENT' },
      select: { id: true },
    });
    if (!client) throw new BadRequestException('Cliente não encontrado');

    const notes = await this.prisma.clientTeamNote.findMany({
      where: { tenantId: user.tenantId, clientUserId: id },
      orderBy: { createdAt: 'desc' },
      take: 80,
    });
    const authorIds = [...new Set(notes.map((n) => n.authorUserId))];
    const authors = await this.prisma.user.findMany({
      where: { id: { in: authorIds }, tenantId: user.tenantId },
      select: { id: true, name: true },
    });
    const nameById = new Map(authors.map((a) => [a.id, a.name]));
    return notes.map((n) => ({
      id: n.id,
      body: n.body,
      authorUserId: n.authorUserId,
      authorName: nameById.get(n.authorUserId) ?? '—',
      createdAt: n.createdAt,
    }));
  }

  @Roles('OWNER', 'BARBER')
  @Post('clientes/:id/notas-equipe')
  async addClientTeamNote(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() dto: { body: string },
  ) {
    const body = (dto?.body ?? '').trim();
    if (!body) throw new BadRequestException('Texto da nota é obrigatório');
    if (body.length > 8000) throw new BadRequestException('Nota muito longa (máx. 8000 caracteres)');

    const client = await this.prisma.user.findFirst({
      where: { id, tenantId: user.tenantId, role: 'CLIENT' },
      select: { id: true },
    });
    if (!client) throw new BadRequestException('Cliente não encontrado');

    const row = await this.prisma.clientTeamNote.create({
      data: {
        tenantId: user.tenantId,
        clientUserId: id,
        authorUserId: user.sub,
        body,
      },
    });
    const author = await this.prisma.user.findFirst({
      where: { id: user.sub, tenantId: user.tenantId },
      select: { name: true },
    });
    return {
      id: row.id,
      body: row.body,
      authorUserId: row.authorUserId,
      authorName: author?.name ?? '—',
      createdAt: row.createdAt,
    };
  }

  @Roles('OWNER', 'BARBER')
  @Post('clientes')
  async createClient(@CurrentUser() user: any, @Body() dto: { name: string; email?: string; phone?: string }) {
    if (!dto.name || (!dto.email && !dto.phone)) {
      throw new BadRequestException('Nome e contato (email ou telefone) são obrigatórios');
    }

    const phoneNorm = dto.phone?.trim() ? phoneDigitsForApi(dto.phone) : '';
    const emailTrim = dto.email?.trim();

    const clients = await this.prisma.user.findMany({
      where: { tenantId: user.tenantId, role: 'CLIENT' },
      select: { id: true, email: true, phone: true },
    });
    const existing = clients.find(
      (c) =>
        (emailTrim && c.email === emailTrim) ||
        (phoneNorm.length >= 10 && phoneDigitsForApi(c.phone) === phoneNorm),
    );

    if (existing) {
      throw new BadRequestException('Cliente com este email ou telefone já cadastrado');
    }

    return this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email || `${Date.now()}@placeholder.com`,
        phone: phoneNorm || null,
        role: 'CLIENT',
        tenantId: user.tenantId,
        password: 'manual-register-no-pass', // Inativa login direto até que resetem
      },
    });
  }

  @Roles('OWNER', 'BARBER')
  @Get('clientes')
  async getClients(@CurrentUser() user: any, @Query('search') search?: string) {
    const tenantId = user.tenantId;

    // 1. Buscar clientes cadastrados na tabela User
    const users = await this.prisma.user.findMany({
      where: {
        tenantId,
        role: 'CLIENT',
        ...(search ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { phone: { contains: search } },
            { email: { contains: search, mode: 'insensitive' } },
          ],
        } : {}),
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
      },
    });

    const userIds = users.map((u) => u.id);
    const noteCountRows =
      userIds.length === 0
        ? []
        : await this.prisma.clientTeamNote.groupBy({
            by: ['clientUserId'],
            where: { tenantId, clientUserId: { in: userIds } },
            _count: { _all: true },
          });
    const teamNotesCountByClient = new Map(noteCountRows.map((r) => [r.clientUserId, r._count._all]));

    // 2. Buscar agendamentos do tenant (para estatísticas e clientes sem User)
    const appointmentsWhere: any = { tenantId };
    if (search) {
      appointmentsWhere.OR = [
        { clientName: { contains: search, mode: 'insensitive' } },
        { clientPhone: { contains: search } },
      ];
    }

    const db = this.tenantFactory.getClient(user.tenantSlug);
    const appointments = await db.appointment.findMany({
      where: appointmentsWhere,
      select: {
        clientName: true,
        clientPhone: true,
        clientEmail: true,
        startTime: true,
        status: true,
      },
      orderBy: { startTime: 'desc' },
    });

    // 3. Unificar dados
    const clientMap = new Map<string, any>();

    // Primeiro, preencher com os usuários reais
    for (const u of users) {
      const key = u.phone || u.email || u.id;
      clientMap.set(key, {
        id: u.id,
        name: u.name,
        phone: u.phone,
        email: u.email,
        lastVisit: null,
        lastStatus: null,
        totalVisits: 0,
        isRegistered: true,
        teamNotesCount: teamNotesCountByClient.get(u.id) ?? 0,
      });
    }

    // Depois, mesclar com agendamentos
    for (const appt of appointments) {
      const key = appt.clientPhone || appt.clientEmail || appt.clientName;
      
      if (!clientMap.has(key)) {
        // Cliente "vago" sem User criado
        clientMap.set(key, {
          id: `virtual-${key}`,
          name: appt.clientName,
          phone: appt.clientPhone,
          email: appt.clientEmail,
          lastVisit: appt.startTime,
          lastStatus: appt.status,
          totalVisits: 1,
          isRegistered: false,
          teamNotesCount: 0,
        });
      } else {
        const existing = clientMap.get(key);
        existing.totalVisits += 1;
        if (!existing.lastVisit || new Date(appt.startTime) > new Date(existing.lastVisit)) {
          existing.lastVisit = appt.startTime;
          existing.lastStatus = appt.status;
        }
      }
    }

    return Array.from(clientMap.values());
  }
}
 
