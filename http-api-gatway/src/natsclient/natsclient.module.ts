import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";


const client = ClientsModule.register([
    {
        name: "NATS-SERVICE",
        transport: Transport.NATS,
        options: {
            servers: ['nats://nats']
        }
    }
]);

@Module({
    imports: [client],
    exports: [client]
})
export class NatsClientModule { }


