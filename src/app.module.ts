import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { CartsModule } from './carts/carts.module';
import { MessageModule } from './message/message.module';
import { ScheduleModule as ScheduleLogicModule } from './schedule/schedule.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://db:27017/recovery'),
    ScheduleModule.forRoot(),
    CartsModule,
    ScheduleLogicModule,
    MessageModule,
  ],
})
export class AppModule {}
