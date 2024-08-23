/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private readonly usersService: UsersService,
                private readonly jwtService: JwtService,
    ){}

    async register({email,password}:RegisterDto){
        //Antes de hacer la inserción verificar si ese usuario existe o no en la base de datos
        const user = await this.usersService.findOneByEmail(email);
        if(user){
            throw new BadRequestException('User already exists');  //Manejo de errores con exception filters. Esto crea un error ya controlado con Nest
        }
        await this.usersService.create({
            email,
            password: await bcryptjs.hash(password,10) //Contraseña hasheada
        });

        return {
            email
        }
    }
    
    async login({email,password}: LoginDto){
        const user = await this.usersService.findOneByEmail(email);
        if(!user){ //Si no existe el usuario
            throw new UnauthorizedException ('Email is wrong');
        } 
        const isPasswordValid = await bcryptjs.compare(password,user.password);  //Compara la contraseña que pase y la compara con la contraseña de la base de datos
        if(!isPasswordValid){
            throw new UnauthorizedException("Password is wrong");
        }

        const payload = {email: user.email, rol:user.rol} //Payload indica los datos que van a viajar en el token

        const token = await this.jwtService.signAsync(payload)

        return {
            token,
            email
        };
    }

    async profile({email, rol} : {email:string; rol:string}){
        
        return await this.usersService.findOneByEmail(email);
    }
}
