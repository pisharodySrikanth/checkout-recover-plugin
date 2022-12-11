import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Schedule, ScheduleDocument } from './schedule.schema';
import { DEFAULT_SCHEDULES } from './constants';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel(Schedule.name) private scheduleModel: Model<ScheduleDocument>,
  ) {}

  async getCurrentSchedule() {
    const schedules = await this.scheduleModel.findOne();

    return schedules !== null ? schedules.schedules : DEFAULT_SCHEDULES;
  }

  async updateSchedule(scheduleInMinutes: number[]) {
    return this.scheduleModel.updateOne(
      {},
      {
        $set: {
          schedules: scheduleInMinutes,
        },
      },
      { upsert: true },
    );
  }
}
