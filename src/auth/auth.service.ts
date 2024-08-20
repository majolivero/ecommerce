/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';

import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {

    constructor(private readonly usersService: UsersService){}

    async register(registerDto: RegisterDto){
        //Antes de hacer la inserción verificar si ese usuario existe o no en la base de datos
        const user = await this.usersService.findOneByEmail(registerDto.email);
        if(user){
            throw new BadRequestException('User already exists');  //Manejo de errores con exception filters. Esto crea un error ya controlado con Nest
        }
        return await this.usersService.create(registerDto);
    }
    
    login(){
        return 'login';
    }
}
