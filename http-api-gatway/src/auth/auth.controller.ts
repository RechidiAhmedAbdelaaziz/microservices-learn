import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {

    constructor(@Inject('NATS-SERVICE') private natsClient: ClientProxy) { }

    @Post('signup') //* {{host}}auth/signup
    signup(@Body() data: any) {
        return this.sendToMicroservice('signup', data);
    }

    @Post('login') //* {{host}}auth/login
    login(@Body() data: any) {
        return this.sendToMicroservice('login', data);
    }


    private sendToMicroservice(cmd: string, data: any) {
        return this.natsClient.send({ cmd }, data);
    }

}
