import { IsAlpha, IsNotEmpty, IsStrongPassword } from "class-validator";

export class LoginDTO {

    @IsNotEmpty()
    @IsAlpha()
    username: string;

    @IsStrongPassword({ minLength: 6 })
    password: string;
}