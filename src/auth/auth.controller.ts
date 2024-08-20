/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}   //Para poder usar el servicio hay que inyectarlo. Cada vez que hagamos un register y un login usamos este servicio

    @Post('register')
    register(
        @Body()
        registerDto: RegisterDto,
    ){
       console.log(registerDto);
       return this.authService.register();
    }

    @Post('login')
    login(){
        return this.authService.login();
    }
}

