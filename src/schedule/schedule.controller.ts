import { Body, Controller, Get, Put } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { Schedule } from './schedule.dto';

@Controller('schedule')
export class ScheduleController {
  constructor(private service: ScheduleService) {}

  @Get()
  async get() {
    return this.service.getCurrentSchedule();
  }

  @Put()
  async updateSchedule(@Body() schedule: Schedule) {
    return this.service.updateSchedule(schedule.scheduleInMinutes);
  }
}
