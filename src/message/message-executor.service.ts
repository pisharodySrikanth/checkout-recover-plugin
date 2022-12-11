import { Injectable } from '@nestjs/common';
import { Message } from './message.dto';

@Injectable()
export class MessageExecutorService {
  async sendMessage(message: Message) {
    // REPLACE console.log WITH ACTUAL MESSAGE SENDING CODE(SMS, EMAIL FIRING, ETC.)
    console.log(
      `Sending message: "${message.message}" to email: ${message.email}`,
    );
  }
}
