import { IsNumber } from "class-validator";

export class CreatePaymentDTO {

    @IsNumber()
    amount: number;
}