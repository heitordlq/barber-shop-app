import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import {
  CreateManualAppointmentDto,
  RescheduleAppointmentDto,
  UpdateAppointmentDetailsDto,
  UpdateAppointmentStatusDto,
} from './dto/appointment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { AppointmentStatus } from '../generated/tenant-client';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  /** Public: used by the client booking page */
  @Get('slots/:slug')
  getSlots(
    @Param('slug') slug: string,
    @Query('serviceId') serviceId: string,
    @Query('date') date: string,
    @Query('userId') userId?: string,
    @Query('barberId') barberId?: string,
  ) {
    return this.scheduleService.getAvailableSlots(slug, serviceId, date, userId, barberId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('OWNER', 'BARBER')
  @Post('manual')
  createManual(@CurrentUser() user: any, @Body() dto: CreateManualAppointmentDto) {
    return this.scheduleService.createManual(user, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('OWNER', 'BARBER', 'ADMIN')
  @Get()
  findAll(
    @CurrentUser() user: any,
    @Query('date') date?: string,
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
    @Query('status') status?: AppointmentStatus,
    @Query('barberId') barberId?: string,
  ) {
    return this.scheduleService.findAll(user.tenantId, user.tenantSlug, date, dateFrom, dateTo, status, barberId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('OWNER', 'BARBER')
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body() dto: UpdateAppointmentStatusDto,
  ) {
    return this.scheduleService.updateStatus(
      id,
      user,
      dto.status as AppointmentStatus,
      dto.reason,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('OWNER', 'BARBER')
  @Patch(':id/details')
  updateDetails(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body() dto: UpdateAppointmentDetailsDto,
  ) {
    return this.scheduleService.updateAppointmentDetails(id, user, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('OWNER', 'BARBER')
  @Patch(':id/reschedule')
  reschedule(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body() dto: RescheduleAppointmentDto,
  ) {
    return this.scheduleService.reschedule(id, user, dto);
  }
}
