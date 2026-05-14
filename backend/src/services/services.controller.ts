import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, NotFoundException } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto, UpdateServiceDto } from './dto/service.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { PrismaService } from '../prisma/prisma.service';

@Controller('services')
export class ServicesController {
  constructor(
    private readonly servicesService: ServicesService,
    private readonly prisma: PrismaService,
  ) {}

  /** Public: list active services for a tenant (called with tenantId OR slug) */
  @Get('public/:tenantRef')
  async findPublic(@Param('tenantRef') tenantRef: string) {
    const tenant = await this.prisma.tenant.findFirst({
      where: { OR: [{ id: tenantRef }, { slug: tenantRef }] },
      select: { id: true, slug: true },
    });
    if (!tenant) throw new NotFoundException('Barbearia não encontrada');
    return this.servicesService.findAll(tenant.id, tenant.slug, true);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('OWNER')
  @Post()
  create(@CurrentUser() user: any, @Body() dto: CreateServiceDto) {
    return this.servicesService.create(user.tenantId, user.tenantSlug, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('OWNER', 'BARBER')
  @Get()
  findAll(@CurrentUser() user: any) {
    return this.servicesService.findAll(user.tenantId, user.tenantSlug);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('OWNER')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body() dto: UpdateServiceDto,
  ) {
    return this.servicesService.update(id, user.tenantId, user.tenantSlug, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('OWNER')
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.servicesService.remove(id, user.tenantId, user.tenantSlug);
  }
}
