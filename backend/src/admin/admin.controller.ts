import { Controller, Get, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('dashboard')
  getDashboard() {
    return this.adminService.getDashboard();
  }

  @Get('tenants')
  getTenants(
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('status') status?: string,
  ) {
    return this.adminService.getAllTenants(
      page ? parseInt(page) : 1,
      pageSize ? parseInt(pageSize) : 20,
      status,
    );
  }

  @Get('tenants/:id')
  getTenantDetail(@Param('id') id: string) {
    return this.adminService.getTenantDetail(id);
  }

  @Patch('tenants/:id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: 'ACTIVE' | 'INACTIVE' | 'DELINQUENT',
    @Body('reason') reason: string,
  ) {
    return this.adminService.updateTenantStatus(id, status, reason);
  }

  @Patch('tenants/:id/plan')
  updatePlan(
    @Param('id') id: string,
    @Body('planId') planId: string | null,
    @Body('reason') reason: string,
  ) {
    return this.adminService.updateTenantPlan(id, planId, reason);
  }

  @Get('financeiro')
  getFinanceiro(
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
  ) {
    return this.adminService.getFinanceiro(dateFrom, dateTo);
  }
}
