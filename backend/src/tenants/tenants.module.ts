import { Module } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { TenantsController } from './tenants.controller';
import { TenantUsersController } from './tenant-users.controller';

@Module({
  controllers: [TenantsController, TenantUsersController],
  providers: [TenantsService],
  exports: [TenantsService],
})
export class TenantsModule {}
