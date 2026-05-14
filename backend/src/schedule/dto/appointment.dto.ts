import { IsString, IsOptional, IsDateString, IsNotEmpty, IsArray, IsIn, MaxLength } from 'class-validator';

export class CreateManualAppointmentDto {
  @IsString()
  serviceId: string;

  @IsOptional()
  @IsString()
  barberId?: string;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  loyaltySubscriptionId?: string;

  @IsString()
  clientName: string;

  @IsOptional()
  @IsString()
  clientPhone?: string;

  @IsOptional()
  @IsString()
  clientEmail?: string;

  @IsDateString()
  startTime: string;

  @IsOptional()
  @IsString()
  notes?: string;

  /** Origem livre (ex.: Balcão, WhatsApp, Instagram). Agendamentos pelo app usam "App" no backend. */
  @IsOptional()
  @IsString()
  @MaxLength(120)
  bookingSource?: string;
}

export class GetSlotsDto {
  @IsString()
  serviceId: string;

  @IsDateString()
  date: string;
}

export class UpdateAppointmentStatusDto {
  @IsString()
  status: string;

  @IsString()
  @IsNotEmpty()
  reason: string;
}

export class UpdateAppointmentDetailsDto {
  @IsString()
  @IsNotEmpty()
  reason: string;

  @IsOptional()
  @IsString()
  clientName?: string;

  @IsOptional()
  @IsString()
  clientPhone?: string;

  @IsOptional()
  @IsString()
  clientEmail?: string;

  @IsOptional()
  @IsString()
  serviceId?: string;

  /** IDs de serviços extras (além do principal); duração e valor (balcão sem plano) são recalculados. */
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  additionalServiceIds?: string[];

  /** NONE | LEAVE | BLOCK — folga ou bloqueio na grade. */
  @IsOptional()
  @IsString()
  @IsIn(['NONE', 'LEAVE', 'BLOCK'])
  holdKind?: string;

  /** Obrigatório ao marcar LEAVE ou BLOCK. */
  @IsOptional()
  @IsString()
  holdReason?: string;

  /** Comanda: sequência de serviços com barbeiro opcional por linha (null = mesmo da âncora). Array vazio remove a comanda. */
  @IsOptional()
  @IsArray()
  comandaLines?: { serviceId: string; barberId?: string | null }[];

  @IsOptional()
  @IsString()
  @MaxLength(120)
  bookingSource?: string;
}

export class RescheduleAppointmentDto {
  @IsDateString()
  startTime: string;

  /**
   * Novo profissional. Se omitido, mantém o atual.
   * Envie string vazia para "sem profissional" (será normalizado para null).
   */
  @IsOptional()
  @IsString()
  barberId?: string;

  @IsString()
  @IsNotEmpty()
  reason: string;
}
