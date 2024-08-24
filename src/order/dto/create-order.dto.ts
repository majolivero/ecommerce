/* eslint-disable prettier/prettier */
import { IsNotEmpty,IsNumber, IsArray, ArrayMinSize } from 'class-validator';

export class CreateOrderDto {
    @IsNotEmpty()
    @IsNumber()
    userId: number

    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    products: number[];

    @IsNotEmpty()
    @IsNumber()
    totalPrice: number;
}
