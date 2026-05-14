import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bullmq';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { TenantsModule } from './tenants/tenants.module';
import { ServicesModule } from './services/services.module';
import { ScheduleAppModule } from './schedule/schedule.module';
import { PaymentsModule } from './payments/payments.module';
import { PlansModule } from './plans/plans.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AdminModule } from './admin/admin.module';
import { LoyaltyModule } from './loyalty/loyalty.module';
import { TenantContextMiddleware } from './common/middleware/tenant-context.middleware';
import { BootstrapService } from './common/services/bootstrap.service';

/**
 * Main Application Module
 * Last updated: 2026-04-10 (Loyalty System Integration)
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
      },
    }),
    PrismaModule,
    AuthModule,
    TenantsModule,
    ServicesModule,
    ScheduleAppModule,
    PaymentsModule,
    PlansModule,
    NotificationsModule,
    AdminModule,
    LoyaltyModule,
  ],
  providers: [BootstrapService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantContextMiddleware).forRoutes('*');
  }
}
