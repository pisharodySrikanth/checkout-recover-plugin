import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ScheduleDocument = HydratedDocument<Schedule>;

@Schema()
export class Schedule {
  @Prop()
  schedules: number[];
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
