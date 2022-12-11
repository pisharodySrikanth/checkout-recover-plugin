import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CartDocument = HydratedDocument<Cart>;

@Schema()
class User {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;
}

const UserSchema = SchemaFactory.createForClass(User);

@Schema()
export class Cart {
  @Prop()
  token: string;

  @Prop()
  url: string;

  @Prop({ type: UserSchema })
  user: User;

  @Prop()
  createdAt: Date;

  @Prop()
  orderPlaced: boolean;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
