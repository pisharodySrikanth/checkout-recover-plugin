import { Body, Controller, Get, Post } from '@nestjs/common';
import { CartDone } from './cart-done.dto';
import { CreateCart } from './create-cart.dto';
import { RecoveryService } from './recovery.service';

@Controller('carts')
export class RecoveryController {
  constructor(private service: RecoveryService) {}

  @Post()
  async store(@Body() payload: CreateCart) {
    return this.service.create({
      token: payload.cart_token,
      url: payload.abandoned_checkout_url,
      email: payload.customer.email,
      createdAt: payload.created_at,
    });
  }

  @Get('/triggerables')
  getCartsToTrigger() {
    return this.service.getTriggerables();
  }

  @Post('/placed')
  markCartAsDone(@Body() payload: CartDone) {
    return this.service.markCartAsDone(payload.cart_token);
  }
}
