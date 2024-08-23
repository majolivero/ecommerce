/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';  //A traves de reflector se pueden leer los metadatos

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private readonly reflector: Reflector){}

  canActivate(
    context: ExecutionContext,
  ): boolean{
    const rol = this.reflector.getAllAndOverride('roles', [
      context.getHandler(),
      context.getClass()
    ])

    //En caso de que no existan los roles, devolvemos true
    if(!rol){
      return true;   //Esto indica si lo dejamos entrar o no, en este caso, lo dejamos abierto
    }

    const { user } = context.switchToHttp().getRequest();

    return rol === user.rol;
  }
}
