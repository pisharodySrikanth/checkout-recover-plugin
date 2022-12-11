import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { getSubtractedDate, getOneMinuteRange } from 'src/utilities/date';
import { Cart, CartDocument } from './cart.schema';

@Injectable()
export class CartsService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<CartDocument>) {}

  async findAll() {
    return this.cartModel.find().exec();
  }

  async create(cartDto) {
    return this.cartModel.insertMany([cartDto]);
  }

  async createFakeCarts(cartDto, schedule) {
    const inserts = [];
    const now = new Date();
    const len = schedule[schedule.length - 1];

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
    const now = new Date();
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
