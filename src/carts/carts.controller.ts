import { Body, Controller, Get, Post } from '@nestjs/common';
import { ScheduleService } from 'src/schedule/schedule.service';
import { CartDone } from './cart-done.dto';
import { CreateCart } from './create-cart.dto';
import { CartsService } from './carts.service';

@Controller('carts')
export class CartsController {
  constructor(
    private service: CartsService,
    private scheduleService: ScheduleService,
  ) {}

  @Post()
  async store(@Body() payload: CreateCart) {
    return this.service.create({
      token: payload.cart_token,
      url: payload.abandoned_checkout_url,
      user: {
        firstName: payload.customer.first_name,
        lastName: payload.customer.last_name,
        email: payload.customer.email,
      },
      createdAt: payload.created_at,
    });
  }

  @Post('/fake')
  async createFakeCarts(@Body() payload: CreateCart) {
    const currentSchedule = await this.scheduleService.getCurrentSchedule();
    return this.service.createFakeCarts(
      {
        token: payload.cart_token,
        url: payload.abandoned_checkout_url,
        user: {
          firstName: payload.customer.first_name,
          lastName: payload.customer.last_name,
          email: payload.customer.email,
        },
        createdAt: payload.created_at,
      },
      currentSchedule,
    );
  }

  @Get('/triggerables')
  async getCartsToTrigger() {
    const currentSchedule = await this.scheduleService.getCurrentSchedule();
    return this.service.getTriggerables(currentSchedule);
  }

  @Post('/placed')
  markCartAsDone(@Body() payload: CartDone) {
    return this.service.markCartAsDone(payload.cart_token);
  }
}
