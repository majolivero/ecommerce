/* eslint-disable prettier/prettier */
import { IsString, IsEmail, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
    @IsEmail()
    email:string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(4)
    password:string;
}
