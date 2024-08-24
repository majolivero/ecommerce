/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configurationApp from 'config/configuration-app';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';


@Module({
  imports: [
    ConfigModule.forRoot({
    envFilePath: `./.env/${process.env.NODE_ENV}.env`,
    load:[configurationApp],
    isGlobal: true,
  }),
    TypeOrmModule.forRoot({
      type:'mysql',
      host:'localhost',
      port:3306,
      username:'root',
      password:'',
      database:'ecommerce',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    UsersModule,
    AuthModule,
    ProductModule,
    OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
