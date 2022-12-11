import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageExecutorService } from './message-executor.service';
import { CartsModule } from 'src/carts/carts.module';
import { ScheduleModule } from 'src/schedule/schedule.module';

@Module({
  providers: [MessageService, MessageExecutorService],
  imports: [CartsModule, ScheduleModule],
})
export class MessageModule {}
