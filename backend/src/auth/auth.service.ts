import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { TenantPrismaFactory } from '../prisma/tenant-prisma.factory';
import * as bcrypt from 'bcryptjs';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private tenantFactory: TenantPrismaFactory,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) throw new ConflictException('Email já cadastrado');

    const slugExists = await this.prisma.tenant.findUnique({ where: { slug: dto.barbershopSlug } });
    if (slugExists) throw new ConflictException('Slug já utilizado. Escolha outro nome para a URL.');

    const hashedPassword = await bcrypt.hash(dto.password, 12);
    const slug = dto.barbershopSlug;

    // 1. Create tenant + owner user in backoffice schema
    const result = await this.prisma.$transaction(async (tx) => {
      const tenant = await tx.tenant.create({
        data: {
          name: dto.barbershopName,
          slug,
          workingHours: {
            mon: { open: '09:00', close: '18:00', breaks: [{ start: '12:00', end: '13:00' }] },
            tue: { open: '09:00', close: '18:00', breaks: [{ start: '12:00', end: '13:00' }] },
            wed: { open: '09:00', close: '18:00', breaks: [{ start: '12:00', end: '13:00' }] },
            thu: { open: '09:00', close: '18:00', breaks: [{ start: '12:00', end: '13:00' }] },
            fri: { open: '09:00', close: '18:00', breaks: [{ start: '12:00', end: '13:00' }] },
            sat: { open: '09:00', close: '13:00', breaks: [] },
          },
        },
      });

      const user = await tx.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          password: hashedPassword,
          role: 'OWNER',
          tenantId: tenant.id,
          tenantSlug: slug,
        },
      });

      return { tenant, user };
    });

    // 2. Provision the tenant's PostgreSQL schema + tables
    await this.tenantFactory.provisionTenantSchema(slug, this.prisma);

    const tokens = await this.generateTokens(
      result.user.id,
      result.user.email,
      result.user.role,
      result.tenant.id,
      slug,
    );
    await this.updateRefreshToken(result.user.id, tokens.refreshToken);

    return {
      user: { id: result.user.id, name: result.user.name, email: result.user.email, role: result.user.role },
      tenant: { id: result.tenant.id, slug: result.tenant.slug, name: result.tenant.name },
      ...tokens,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: { tenant: true },
    });

    if (!user) throw new UnauthorizedException('Credenciais inválidas');
    if (user.blocked) throw new UnauthorizedException('Conta desativada. Fale com o proprietário.');

    const passwordValid = await bcrypt.compare(dto.password, user.password);
    if (!passwordValid) throw new UnauthorizedException('Credenciais inválidas');

    // Use cached tenantSlug field (or fallback to tenant relation)
    const tenantSlug = user.tenantSlug ?? user.tenant?.slug ?? '';

    const tokens = await this.generateTokens(user.id, user.email, user.role, user.tenantId ?? '', tenantSlug);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      tenant: user.tenant,
      ...tokens,
    };
  }

  async logout(userId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
    return { success: true };
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user || !user.refreshToken) throw new UnauthorizedException('Acesso negado');
    if (user.blocked) throw new UnauthorizedException('Conta desativada');

    const rtMatches = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!rtMatches) throw new UnauthorizedException('Token inválido');

    const tenantSlug = user.tenantSlug ?? '';
    const tokens = await this.generateTokens(user.id, user.email, user.role, user.tenantId ?? '', tenantSlug);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  // ── Helpers ────────────────────────────────────────────────

  private async generateTokens(
    userId: string,
    email: string,
    role: string,
    tenantId: string,
    tenantSlug: string,
  ) {
    const payload = { sub: userId, email, role, tenantId, tenantSlug };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.config.get('JWT_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.config.get('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return { accessToken, refreshToken };
  }

  private async updateRefreshToken(userId: string, refreshToken: string) {
    const hashed = await bcrypt.hash(refreshToken, 10);
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: hashed },
    });
  }
}
