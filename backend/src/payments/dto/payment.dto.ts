import { IsString, IsDateString, IsEmail, IsOptional, ValidateIf } from 'class-validator';

export class CreatePaymentIntentDto {
  @IsString()
  tenantSlug: string;

  @IsString()
  serviceId: string;

  @IsOptional()
  @IsString()
  barberId?: string;

  @IsString()
  clientName: string;

  @IsEmail()
  clientEmail: string;

  @IsOptional()
  @IsString()
  clientPhone?: string;

  @IsDateString()
  startTime: string;
}

export class CreateLoyaltyBookingDto {
  @IsString()
  tenantSlug: string;

  @IsString()
  serviceId: string;

  @IsOptional()
  @IsString()
  barberId?: string;

  /** Opcional se clientEmail/clientPhone conferirem com o titular da assinatura */
  @IsOptional()
  @IsString()
  userId?: string;

  @IsString()
  subscriptionId: string;

  @IsString()
  clientName: string;

  @ValidateIf((o) => !!o.clientEmail && String(o.clientEmail).trim() !== '')
  @IsEmail()
  clientEmail?: string;

  @IsOptional()
  @IsString()
  clientPhone?: string;

  @IsDateString()
  startTime: string;
}
