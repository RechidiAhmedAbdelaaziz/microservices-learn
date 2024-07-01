import { Module } from "@nestjs/common";
import { NatsClientModule } from "src/natsclient/natsclient.module";
import { PaymentsController } from "./payments.controller";


@Module({
    imports : [NatsClientModule],
    controllers : [PaymentsController]
})
export class PaymentsModule { }