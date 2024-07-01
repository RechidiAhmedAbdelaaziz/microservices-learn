import { Module } from "@nestjs/common";
import { PaymentsMicroserviceController } from "./payments.controller";
import { NatsClientModule } from "src/natsclient/natsclient.module";


@Module({
    imports: [NatsClientModule],
    controllers: [PaymentsMicroserviceController]
})
export class PaymentsModule { }