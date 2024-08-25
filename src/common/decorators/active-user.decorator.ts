/* eslint-disable prettier/prettier */
//Esto es un decorador personalizado
import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const ActiveUser = createParamDecorator(
    (data: unknown, ctx:ExecutionContext) => {  //Con el execution context podemos acceder al request
        const request = ctx.switchToHttp().getRequest();
        return request.user
    }
)