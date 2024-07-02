import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SignupDTO } from './dtos/signup.dto';

@Controller()
export class AuthMicroserviceController {

    constructor(private readonly authService: AuthService) { }

    @MessagePattern({ cmd: 'signup' })
    async signUp(
        @Payload() data: SignupDTO
    ) {
        return await this.authService.signUp(data);
    }

    @MessagePattern({ cmd: 'login' })
    async login(
        @Payload() data: any
    ) {
        return await this.authService.login(data);
    }
}
