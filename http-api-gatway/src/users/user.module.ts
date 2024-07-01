import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { NatsClientModule } from "src/natsclient/natsclient.module";


@Module({
    imports : [NatsClientModule],
    controllers: [UsersController],
})
export class UsersModel { }
