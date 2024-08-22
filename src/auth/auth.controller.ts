/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}   //Para poder usar el servicio hay que inyectarlo. Cada vez que hagamos un register y un login usamos este servicio

    @Post('register')
    register(
        @Body()
        registerDto: RegisterDto,
    ){
       return this.authService.register(registerDto);
    }

    @Post('login')
    login(
        @Body()
        loginDto:LoginDto,
    ){
        return this.authService.login(loginDto)
    }

    //Ruta ejemplo para probar guard
    @Get('profile')
    @UseGuards(AuthGuard)   //Decorador para hacer la conexión con el guard. Cada vez que queramos llamar al profile va a entrar a UseGuards, y a su vez este entra al canActivate
    profile(
        @Request()
        req
    ){
        return req.user
    }
}