/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Product } from '../product/entities/product.entity';
import { Order } from '../order/entities/order.entity';

@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>, 
    @InjectRepository(Product) private readonly productRepository: Repository<Product>
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    // Aquí desestructuramos el DTO correctamente
    const { userId, productIds, totalPrice } = createOrderDto;

    try {
      if (productIds.length === 0) {
        throw new BadRequestException("You must select at least one product.");
      }

      const products = await this.productRepository.find({
        where: { id: In(productIds) }
      });

      if (products.length === 0) {
        throw new NotFoundException("No products were found with the IDs provided.");
      }

      const order = this.orderRepository.create({
        userId,
        products,
        totalPrice
      });

      await this.orderRepository.save(order);

      return order;

    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException("An error occurred while creating the order.");
      }
    }
  }
}
