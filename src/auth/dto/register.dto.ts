/* eslint-disable prettier/prettier */
import { IsString, IsEmail, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class RegisterDto{

    @IsEmail()
    email:string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(8)
    password:string;

    rol:string;
}