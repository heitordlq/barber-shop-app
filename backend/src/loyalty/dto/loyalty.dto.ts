import { IsString, IsNumber, IsOptional, IsEnum, IsArray, IsInt, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { LoyaltyPlanInterval } from '../../generated/tenant-client';

export class LoyaltyPlanItemDto {
  @IsString()
  serviceId: string;

  @IsInt()
  quantity: number;

  @IsArray()
  @IsInt({ each: true })
  allowedDays: number[]; // 0-6
}

export class CreateLoyaltyPlanDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  price: number;

  @IsEnum(LoyaltyPlanInterval)
  interval: LoyaltyPlanInterval;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LoyaltyPlanItemDto)
  items: LoyaltyPlanItemDto[];
}

export class UpdateLoyaltyPlanDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsEnum(LoyaltyPlanInterval)
  @IsOptional()
  interval?: LoyaltyPlanInterval;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => LoyaltyPlanItemDto)
  items?: LoyaltyPlanItemDto[];
}

export class IdentifyClientDto {
  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;
}

export class UpdateSubscriptionBarberDto {
  @IsString()
  barberId: string;
}

export class ManualSubscriptionDto {
  @IsString()
  planId: string;

  /** Obrigatório quando a barbearia usa caixa separado (assinatura fica na carteira do barbeiro). */
  @IsString()
  @IsOptional()
  barberId?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  name?: string;
}
