import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CartDocument = HydratedDocument<Cart>;

@Schema()
export class Cart {
  @Prop()
  token: string;

  @Prop()
  url: string;

  @Prop()
  userEmail: string;

  @Prop()
  createdAt: Date;

  @Prop()
  orderPlaced: boolean;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
