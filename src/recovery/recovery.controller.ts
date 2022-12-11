import { Controller, Get } from '@nestjs/common';
import { RecoveryService } from './recovery.service';

@Controller('recovery')
export class RecoveryController {
  constructor(private service: RecoveryService) {}

  @Get()
  index() {
    return { data: this.service.findAll() };
  }
}
