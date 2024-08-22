/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from '../constants/jwt.constants';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor( private readonly jwtService: JwtService ){}

  async canActivate(     //El canActivate es el metodo de Nest que se ejecuta antes de una petición. Quiero verificar en este canActivate si el token que le estoy enviando es valido, y si es valido lo dejo pasar a una ruta específica
    context: ExecutionContext,
  ):Promise<boolean>{

    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);
    if(!token){
      throw new UnauthorizedException();
    }

    try{
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstants.secret
        }
      );
      //Al request le podamos inyectar o agregar información, en este caso, le estamos inyectando un usuario
      request['user'] = payload;
    }catch {
      throw new UnauthorizedException();
    }
    
    return true; //Es importante porque este return es que el autoriza o no a seguir la ruta
  }

  private extractTokenFromHeader(request:Request):string | undefined {
    const [type, token] = request.headers.authorization?.split(' ')?? [];
    return type === 'Bearer' ? token: undefined;
  }
}
