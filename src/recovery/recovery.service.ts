import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';

@Injectable()
export class RecoveryService {
  private arr = [1, 2, 3];

  constructor(@InjectModel(Cart.name) private cartModel: Model<CartDocument>) {}

  async findAll() {
    return this.cartModel.find().exec();
  }
}
