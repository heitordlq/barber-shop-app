import {
  IsString,
  IsOptional,
  IsObject,
  MaxLength,
  IsEnum,
  IsBoolean,
  IsNumber,
  Min,
  Max,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';
import { BillingModel } from '@prisma/client';

export class UpdateTenantDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsObject()
  workingHours?: Record<string, any>;

  @IsOptional()
  @IsEnum(BillingModel)
  billingModel?: BillingModel;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(100)
  defaultOwnerCutPercent?: number;

  @IsOptional()
  @IsBoolean()
  separateCashRegisterEnabled?: boolean;

  /** Minutos livres após cada atendimento (0 = desligado). Máx. 120. */
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(120)
  appointmentGapMinutes?: number;
}
