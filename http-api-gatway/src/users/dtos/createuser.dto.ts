import { IsAlpha, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateUserDTO {


    @IsAlpha()
    name: string;


    @IsAlpha()
    nickname?: string;
}