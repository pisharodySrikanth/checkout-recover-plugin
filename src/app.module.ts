import { Module } from '@nestjs/common';
import { RecoveryModule } from './recovery/recovery.module';

@Module({
  imports: [RecoveryModule],
})
export class AppModule {}
