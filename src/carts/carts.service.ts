import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from './cart.schema';
import { getSubtractedDate, getOneMinuteRange } from '../utilities/date';

const hardcodedDate = '2022-12-11T06:31:25.035Z';

@Injectable()
export class CartsService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<CartDocument>) {}

  async findAll() {
    return this.cartModel.find().exec();
  }

  async create(cartDto) {
    return this.cartModel.insertMany([cartDto]);
  }

  async createFakeCarts(cartDto) {
    const inserts = [];
    const now = new Date(hardcodedDate);
    const len = 65;

    for (let i = 0; i < len; i++) {
      inserts.push({
        ...cartDto,
        createdAt: getSubtractedDate(now, len - i),
      });
    }

    return this.cartModel.insertMany(inserts);
  }

  async markCartAsDone(token: string) {
    return this.cartModel.updateOne(
      {
        token,
      },
      {
        $set: {
          orderPlaced: true,
        },
      },
    );
  }

  async getTriggerables(schedules: number[]) {
    const now = new Date(hardcodedDate);
    const conditions = schedules.map((schedule) => {
      const { lt: $lt, gte: $gte } = getOneMinuteRange(
        getSubtractedDate(now, schedule),
      );

      return {
        createdAt: { $lt, $gte },
      };
    });

    const carts = await this.cartModel.find({
      $or: conditions,
      orderPlaced: { $ne: true },
    });

    return carts.map((cart) => ({
      url: cart.url,
      user: cart.user,
      createdAt: cart.createdAt,
    }));
  }
}
