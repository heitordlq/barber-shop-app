import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { TenantPrismaFactory } from './tenant-prisma.factory';

@Global()
@Module({
  providers: [PrismaService, TenantPrismaFactory],
  exports: [PrismaService, TenantPrismaFactory],
})
export class PrismaModule {}
