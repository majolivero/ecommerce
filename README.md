<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

--------
PASOS PARA LA CREACIÓN DEL PROYECTO

1.Instalación de Nest JS local 

```bash
npx @nestjs/cli new nombre-del-proyecto
```
2.Entrar a la carpeta del proyecto

```bash
cd nombre-proyecto
```

3.Vincular el repositorio de GitHub con el proyecto local creado por Nest:

```bash
git remote add origin https://github.com/tu-usuario/nombre-del-repositorio.git
git branch -M main
git push -u origin main
```

4.Prender el servidor con el comando

```bash
npm run start:dev
```

En el navegador deberíamos ver en localhost: 3000, Hello World!.

5.Instalación de dependencias

5.1 Conexión a base de datos
Vamos a la documentación y en la sección RECIPES entramos a TYPEORM.
En el aviso de Warning damos click en here.
En consola copiamos el siguiente comando para la TypeORM Integration.

```bash
npm install --save @nestjs/typeorm typeorm mysql2
```
*@nestjs/typeorm, typeorm: Necesario para trabajar con bases de datos usando TypeORM.
*mysql2: Driver para conectar a MySQL.

5.2 Instalación de JWT y Bcrypt para la autenticación y el hashing de contraseñas

```bash
npm install --save @nestjs/jwt passport-jwt bcrypt
```

5.3 Instalación de Passport: NestJS usa passport para la autenticación

```bash
npm install --save @nestjs/passport passport passport-local
```

5.4 Instalación de Class-validator y class-transformer: Para validaciones y transformación de objetos (esto ya viene por defecto con NestJS, pero es bueno asegurarse de que esté instalado).

```bash
npm install --save class-validator class-transformer
```

5.5 Instalación de NestJS Config: Para manejar variables de entorno y configuraciones

```bash
npm install --save @nestjs/config
```

