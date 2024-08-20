/* eslint-disable prettier/prettier */

//Esta es la forma de parsear nuestros ficheros env a la configuración interna de nest js. Esto cada vez que arranca lo hace nest automaticamente.

import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
    console.log('Cargando configuracion-app.ts');
    return{
        property1: process.env.PROPERTY_1,
        property2: parseInt(process.env.PROPERTY_2, 10) || 1000, 
        property3: process.env.PROPERTY_3 == 'true' 
    }
});