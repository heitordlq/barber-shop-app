import { IsString, IsOptional, IsEmail, IsBoolean, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateTeamMemberDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  /** Percentual do dono sobre o líquido do atendimento (o barbeiro fica com 100 − este valor). Use `-1` para remover override. */
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(-1)
  @Max(100)
  ownerCutPercentOverride?: number;

  @IsOptional()
  @IsBoolean()
  separateCashRegister?: boolean;

  /** % sobre o faturamento líquido total da barbearia (atendimentos). Use `-1` para remover. */
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(-1)
  @Max(100)
  tenantRevenueSharePercent?: number;
}
