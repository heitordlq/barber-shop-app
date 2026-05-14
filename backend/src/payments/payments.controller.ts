import { Controller, Post, Get, Body, Req, UseGuards, Query } from '@nestjs/common';
import type { RawBodyRequest } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentIntentDto, CreateLoyaltyBookingDto } from './dto/payment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Request } from 'express';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  // Iniciar onboarding Stripe Connect
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('OWNER')
  @Post('onboarding')
  getOnboardingLink(@CurrentUser() user: any) {
    return this.paymentsService.getOnboardingLink(user.tenantId);
  }

  // Checar status do onboarding
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('OWNER')
  @Get('onboarding/status')
  checkOnboarding(@CurrentUser() user: any) {
    return this.paymentsService.checkOnboardingStatus(user.tenantId);
  }

  // Criar payment intent (público, chamado pelo app do cliente)
  @Post('intent')
  createIntent(@Body() dto: CreatePaymentIntentDto) {
    return this.paymentsService.createPaymentIntent(dto);
  }

  // Criar agendamento via fidelidade (sem custo imediato)
  @Post('loyalty')
  createLoyaltyBooking(@Body() dto: CreateLoyaltyBookingDto) {
    return this.paymentsService.createLoyaltyBooking(dto);
  }

  // Webhook Stripe (deve ser raw body)
  @Post('webhook')
  webhook(@Req() req: RawBodyRequest<Request>) {
    return this.paymentsService.handleWebhook(req);
  }

  // Dashboard financeiro
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('OWNER', 'BARBER')
  @Get('summary')
  getSummary(
    @CurrentUser() user: any,
    @Query('date') date?: string,
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
    @Query('barberId') barberId?: string,
  ) {
    return this.paymentsService.getFinancialSummary(
      user.tenantId,
      user.tenantSlug,
      date,
      dateFrom,
      dateTo,
      { sub: user.sub, role: user.role },
      barberId,
    );
  }
}
