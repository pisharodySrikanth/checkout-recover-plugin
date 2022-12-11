import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from './schemas/cart.schema';
import { RecoveryController } from './recovery.controller';
import { RecoveryService } from './recovery.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
  ],
  controllers: [RecoveryController],
  providers: [RecoveryService],
})
export class RecoveryModule {}
