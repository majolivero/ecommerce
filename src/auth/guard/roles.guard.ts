/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';  //A traves de reflector se pueden leer los metadatos
import { ROLES_KEY } from '../../auth/decorators/roles.decorator';
import { Rol } from '../../common/enums/rol.enum';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private readonly reflector: Reflector){}

  canActivate(
    context: ExecutionContext,
  ): boolean{
    const rol = this.reflector.getAllAndOverride<Rol>(ROLES_KEY, [  //El reflector permite leer el rol
      context.getHandler(),  //Da como resultado la extracción de los metadatos para el controlador de ruta procesado actualmente
      context.getClass()     //Accede a los metadatos de esta clase en específico
    ])

    //En caso de que no existan los roles, devolvemos true
    if(!rol){
      return true;   //Esto indica si lo dejamos entrar o no, en este caso, lo dejamos abierto
    }

    const { user } = context.switchToHttp().getRequest();

    //El administrador puede hacer cualquier cosa que pueda hacer el usuario. Este usuario administrador puede hacer todo en la base de datos
    if(user.rol === Rol.ADMIN) {
      return true;
    }
    
    //Permite acceder a ambos roles
    if(rol === Rol.BOTH){
      return true;
    }

    return rol === user.rol;
  }
}
