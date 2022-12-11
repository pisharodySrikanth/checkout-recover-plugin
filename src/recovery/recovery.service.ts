import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';
import { getSubtractedDate, getOneMinuteRange } from '../utilities/date';

const SCHEDULES = [30, 35, 60]; // in minutes

@Injectable()
export class RecoveryService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<CartDocument>) {}

  async findAll() {
    return this.cartModel.find().exec();
  }

  async create(cartDto) {
    return this.cartModel.insertMany([cartDto]);
  }

  async createFakeCarts(cartDto) {
    const inserts = [];
    const now = new Date();
    const len = 30;

    for (let i = 0; i < 30; i++) {
      inserts.push({
        ...cartDto,
        createdAt: getSubtractedDate(now, len - i),
      });
    }

    return this.cartModel.insertMany(inserts);
  }

  markCartAsDone(token: string) {
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

  async getTriggerables() {
    const now = new Date('2022-12-11T06:31:25.035Z');
    const conditions = SCHEDULES.map((schedule) => {
      const { lt: $lt, gte: $gte } = getOneMinuteRange(
        getSubtractedDate(now, schedule),
      );

      return {
        createdAt: { $lt, $gte },
      };
    });

    return this.cartModel.find({ $or: conditions, orderPlaced: { $ne: true } });
  }
}
