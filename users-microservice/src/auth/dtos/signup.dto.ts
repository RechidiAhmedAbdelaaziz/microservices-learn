import { IsAlpha, IsString, IsStrongPassword } from "class-validator";

export class SignupDTO {
    
    @IsAlpha()
    username : string;

    @IsString()
    @IsStrongPassword({minLength : 6})
    password : string;

}