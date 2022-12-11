import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CartsService } from 'src/carts/carts.service';
import { ScheduleService } from 'src/schedule/schedule.service';
import { MessageExecutorService } from './message-executor.service';

@Injectable()
export class MessageService {
  constructor(
    private messageExecutor: MessageExecutorService,
    private cartsService: CartsService,
    private scheduleService: ScheduleService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async sendMessages() {
    const currentSchedule = await this.scheduleService.getCurrentSchedule();
    const toSend = await this.cartsService.getTriggerables(currentSchedule);

    return Promise.all(
      toSend.map((cart) => {
        const message = {
          email: cart.user.email,
          message: `Hey ${cart.user.firstName}, we have noticed that there are items in your cart pending for checkout. Click here to proceed: ${cart.url}`,
        };

        return this.messageExecutor.sendMessage(message);
      }),
    );
  }
}
