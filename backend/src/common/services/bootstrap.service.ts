import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class BootstrapService implements OnApplicationBootstrap {
  private readonly logger = new Logger(BootstrapService.name);

  constructor(private prisma: PrismaService) {}

  async onApplicationBootstrap() {
    await this.createDefaultAdmin();
  }

  private async createDefaultAdmin() {
    const adminEmail = 'admin@barberdash.com';
    const adminPassword = 'admin123';

    try {
      const adminCount = await this.prisma.user.count({
        where: { role: 'ADMIN' },
      });

      if (adminCount === 0) {
        this.logger.log('Nenhum administrador encontrado. Criando administrador padrão...');

        const hashedPassword = await bcrypt.hash(adminPassword, 12);

        await this.prisma.user.create({
          data: {
            name: 'Administrador Sistema',
            email: adminEmail,
            password: hashedPassword,
            role: 'ADMIN',
          },
        });

        this.logger.log(`Administrador padrão criado com sucesso!`);
        this.logger.log(`Email: ${adminEmail}`);
        this.logger.log(`Senha: ${adminPassword}`);
        this.logger.warn('Certifique-se de alterar a senha padrão após o primeiro login.');
      } else {
        this.logger.debug('Administradores já configurados no sistema.');
      }
    } catch (error) {
      this.logger.error('Erro ao verificar ou criar o administrador padrão:', error);
    }
  }
}
