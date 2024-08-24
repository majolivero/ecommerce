/* eslint-disable prettier/prettier */
import { SetMetadata } from "@nestjs/common";  //SetMetadata sirve para agregar datos personalizados
import { Rol } from "../enums/rol.enum";

export const ROLES_KEY = 'roles';
export const Roles = (rol: Rol) => SetMetadata('ROLES_KEY', rol);  //SetMetadata tiene un key y un value. Esto lo podemos verificar en un guard para ver si el usuario viene con ese rol o no