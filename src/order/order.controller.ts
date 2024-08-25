/* eslint-disable prettier/prettier */
import { Controller, Post, Body, HttpCode, HttpStatus, BadRequestException, NotFoundException, InternalServerErrorException,} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from '../order/entities/order.entity';
import { Auth } from '../auth/decorators/auth.decorator';
import { Rol } from '../common/enums/rol.enum';
//import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')

export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Auth(Rol.USER)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createOrderDto: CreateOrderDto): Promise<{ message: string; order: Order}> {
    try{
      const order = await this.orderService.create(createOrderDto);
      return {
        message: 'Order created succesfully',
        order,
      };
    }catch(error){
      //Manejo de excepciones
      if(error instanceof BadRequestException || error instanceof NotFoundException){
        throw error;
      }else{
        throw new InternalServerErrorException("An error occurred while creating the order.");
      }
    }
  }

  // @Get()
  // findAll() {
  //   return this.orderService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.orderService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
  //   return this.orderService.update(+id, updateOrderDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.orderService.remove(+id);
  // }
}
