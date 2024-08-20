/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {

  constructor(
    private configService: ConfigService
  ){
    console.log(this.configService.get<string>('config.property1'));
    console.log(this.configService.get<number>('config.property2'));
    console.log(this.configService.get<boolean>('config.property3'));
  }

  getHello(): string {
    return 'Hello World!';
  }
}
