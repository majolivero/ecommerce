/* eslint-disable prettier/prettier */
import { SetMetadata } from "@nestjs/common";  //SetMetadata sirve para agregar datos personalizados

export const Roles = (rol) => SetMetadata('roles', rol);  //SetMetadata tiene un key y un value