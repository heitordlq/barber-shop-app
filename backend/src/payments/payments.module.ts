import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { ScheduleAppModule } from '../schedule/schedule.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [ScheduleAppModule, NotificationsModule],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
