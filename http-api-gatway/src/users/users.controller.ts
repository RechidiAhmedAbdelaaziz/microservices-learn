import { Body, Controller, Inject, Post, UseFilters } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDTO } from './dtos/createuser.dto';

@Controller('users')
export class UsersController {
    constructor(@Inject('NATS-SERVICE') private natsClient: ClientProxy) { }

    @Post()
    create(@Body() data: CreateUserDTO) {
        return this.natsClient.send(
            {
                cmd: 'create_user',

            },
            data,
        )
    }
}
