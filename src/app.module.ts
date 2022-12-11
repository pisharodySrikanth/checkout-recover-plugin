import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecoveryModule } from './recovery/recovery.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://db:27017/recovery'),
    RecoveryModule,
  ],
})
export class AppModule {}
