import { Controller, Get, Patch, Post, Body, Param, UseGuards, Query, Headers } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { UpdateTenantDto } from './dto/tenant.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  // ── Rotas estáticas primeiro (evitar conflito com :slug wildcard) ──────────

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('OWNER', 'ADMIN', 'BARBER')
  @Get('me')
  findMe(@CurrentUser() user: any) {
    return this.tenantsService.findMe(user.tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('OWNER', 'BARBER')
  @Post('me/toggle-closed')
  toggleClosed(@CurrentUser() user: any) {
    return this.tenantsService.toggleTemporarilyClosed(user.tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('OWNER')
  @Patch('me')
  updateMe(@CurrentUser() user: any, @Body() dto: UpdateTenantDto) {
    return this.tenantsService.updateMe(user.tenantId, dto);
  }

  /** Serviços mais frequentes (nomes reais dos schemas tenant) — antes de `:slug/public`. */
  @Get('public/popular-services')
  popularServices() {
    return this.tenantsService.getPopularServices();
  }

  /** Busca pública de barbearias — antes de `:slug/public`. */
  @Get('public/search')
  async searchPublic(
    @Query('q') q?: string,
    @Query('service') service?: string,
    @Query('services') servicesPipe?: string,
    @Query('filter') filter?: string,
    @Query('visitedSlugs') visitedSlugs?: string,
    @Query('subscriberOnly') subscriberOnly?: string,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Headers('x-client-email') clientEmail?: string,
    @Headers('x-client-phone') clientPhone?: string,
  ) {
    const allowed = new Set([
      'available_now',
      'available_week',
      'slot_free_now',
      'slot_free_week',
      'all',
    ]);
    const f = filter && allowed.has(filter) ? filter : 'all';
    const serviceTerms =
      servicesPipe
        ?.split('|')
        .map((s) => {
          try {
            return decodeURIComponent(s.trim());
          } catch {
            return s.trim();
          }
        })
        .filter(Boolean) ?? [];
    const visitedSlugsOrder = visitedSlugs
      ? visitedSlugs.split(',').map((s) => s.trim()).filter(Boolean)
      : undefined;
    const subOn = subscriberOnly === '1' || subscriberOnly === 'true';
    let subscriberUserId: string | null | undefined = undefined;
    if (subOn) {
      subscriberUserId = await this.tenantsService.lookupUserIdForPublicIdentify(
        clientEmail?.trim(),
        clientPhone?.trim(),
      );
    }
    return this.tenantsService.searchPublic({
      q,
      service,
      serviceTerms,
      visitedSlugsOrder,
      subscriberOnly: subOn,
      subscriberUserId: subOn ? subscriberUserId : undefined,
      filter: f as 'available_now' | 'available_week' | 'slot_free_now' | 'slot_free_week' | 'all',
      page: page ? Number(page) : 1,
      pageSize: pageSize ? Number(pageSize) : 20,
    });
  }

  // ── Rota dinâmica por último (wildcard :slug) ─────────────────────────────

  @Get(':slug/public')
  findPublic(@Param('slug') slug: string) {
    return this.tenantsService.findBySlug(slug);
  }

  @Get(':slug/public/barbers')
  findPublicBarbers(@Param('slug') slug: string) {
    return this.tenantsService.findPublicBarbers(slug);
  }

  @Get(':slug/public/appointments/:appointmentId')
  getPublicAppointment(
    @Param('slug') slug: string,
    @Param('appointmentId') appointmentId: string,
  ) {
    return this.tenantsService.getPublicAppointmentSummary(slug, appointmentId);
  }
}
