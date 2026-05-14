import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Query, NotFoundException } from '@nestjs/common';
import { LoyaltyService } from './loyalty.service';
import {
  CreateLoyaltyPlanDto,
  UpdateLoyaltyPlanDto,
  IdentifyClientDto,
  ManualSubscriptionDto,
  UpdateSubscriptionBarberDto,
} from './dto/loyalty.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { PrismaService } from '../prisma/prisma.service';

@Controller('loyalty')
export class LoyaltyController {
  constructor(
    private readonly loyaltyService: LoyaltyService,
    private readonly prisma: PrismaService,
  ) {}

  /** Resolve tenant slug from tenantId for public routes */
  private async resolveTenantSlug(tenantId: string): Promise<string> {
    const tenant = await this.prisma.tenant.findUnique({
      where: { id: tenantId },
      select: { slug: true },
    });
    if (!tenant) throw new NotFoundException('Barbearia não encontrada');
    return tenant.slug;
  }

  @Get('public/:tenantId/plans')
  async findPublic(@Param('tenantId') tenantId: string) {
    const tenantSlug = await this.resolveTenantSlug(tenantId);
    return this.loyaltyService.findAllPlans(tenantId, tenantSlug);
  }

  @Post('public/:tenantId/subscribe')
  async publicSubscribe(@Param('tenantId') tenantId: string, @Body() dto: ManualSubscriptionDto) {
    const tenantSlug = await this.resolveTenantSlug(tenantId);
    return this.loyaltyService.createManualSubscription(tenantId, tenantSlug, dto, undefined);
  }

  @Post('public/:tenantId/identify')
  async identifyPublicTenant(
    @Param('tenantId') tenantId: string,
    @Body() dto: IdentifyClientDto,
    @Query('barberId') barberId?: string,
  ) {
    const tenantSlug = await this.resolveTenantSlug(tenantId);
    return this.loyaltyService.identifyClientForTenant(tenantId, tenantSlug, dto, barberId);
  }

  // ── Planos (Gestão) ──────────────────────────────────────────────────────

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('OWNER', 'BARBER')
  @Get('plans')
  findAllPlans(@CurrentUser() user: any) {
    return this.loyaltyService.findAllPlans(user.tenantId, user.tenantSlug);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('OWNER')
  @Post('plans')
  createPlan(@CurrentUser() user: any, @Body() dto: CreateLoyaltyPlanDto) {
    return this.loyaltyService.createPlan(user.tenantId, user.tenantSlug, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('OWNER')
  @Patch('plans/:id')
  updatePlan(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body() dto: UpdateLoyaltyPlanDto,
  ) {
    return this.loyaltyService.updatePlan(id, user.tenantId, user.tenantSlug, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('OWNER')
  @Delete('plans/:id')
  deletePlan(@Param('id') id: string, @CurrentUser() user: any) {
    return this.loyaltyService.deletePlan(id, user.tenantId, user.tenantSlug);
  }

  // ── Identificação e Assinaturas ───────────────────────────────────────────

  @Post('identify')
  identifyClient(@Body() dto: IdentifyClientDto) {
    return this.loyaltyService.identifyClient(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('OWNER', 'BARBER')
  @Post('subscriptions/manual')
  createManualSubscription(@CurrentUser() user: any, @Body() dto: ManualSubscriptionDto) {
    return this.loyaltyService.createManualSubscription(user.tenantId, user.tenantSlug, dto, {
      sub: user.sub,
      role: user.role,
    });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('OWNER', 'BARBER')
  @Get('subscriptions')
  findAllSubscriptions(
    @CurrentUser() user: any,
    @Query('userId') userId?: string,
    @Query('barberId') barberId?: string,
    @Query('unassigned') unassigned?: string,
  ) {
    const unassignedOnly = unassigned === '1' || unassigned === 'true';
    return this.loyaltyService.findAllSubscriptions(
      user.tenantId,
      user.tenantSlug,
      user,
      userId,
      barberId,
      unassignedOnly,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('OWNER', 'BARBER')
  @Patch('subscriptions/:id/status')
  updateStatus(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body() body: { status: string },
  ) {
    return this.loyaltyService.updateSubscriptionStatus(id, user.tenantId, user.tenantSlug, body.status);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('OWNER')
  @Patch('subscriptions/:id/barber')
  updateSubscriptionBarber(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body() dto: UpdateSubscriptionBarberDto,
  ) {
    return this.loyaltyService.updateSubscriptionBarber(id, user.tenantId, user.tenantSlug, dto.barberId);
  }
}
