import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreatePaymentDTO } from './dots/createpayment.dto';

@Controller('payments')
export class PaymentsController {
    constructor(@Inject('NATS-SERVICE') private natsClient: ClientProxy) { }

    @Post()
    createPayment(@Body() data: CreatePaymentDTO) {
        const result = this.natsClient.emit('create_payment', data);

        


    }
}
