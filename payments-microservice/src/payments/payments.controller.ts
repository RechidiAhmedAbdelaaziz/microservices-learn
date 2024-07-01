import { Controller, Inject } from "@nestjs/common";
import { ClientProxy, EventPattern, Payload } from "@nestjs/microservices";


@Controller()
export class PaymentsMicroserviceController {

    constructor(@Inject('NATS-SERVICE') private client: ClientProxy) { }


    @EventPattern('create_payment')
    createPayment(
        @Payload() data: {
            amount: number,
        }
    ) {
        console.log("creating ...")
        this.client.emit('payment_created', data);
    }
}