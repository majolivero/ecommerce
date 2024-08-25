/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, NotFoundException } from '@nestjs/common';
import { Auth } from '../auth/decorators/auth.decorator';
import { Rol } from '../common/enums/rol.enum';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  //Crear un producto
  @Auth(Rol.ADMIN)
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    try{
      const product = await this.productService.create(createProductDto);
      return {
        product
      }
    }catch(error){
      throw new BadRequestException("Failed to create the products");
    }
  }

  //Obtener todos los productos
  @Auth(Rol.BOTH)
  @Get()
  async findAll() {
    try{
      const products = await this.productService.findAll();
      return products.length ? products : { message: "No products found"}
    }catch (error) {
      throw new BadRequestException("Failed to obtain the products");
    }
  }

  //Obtener producto por id
  @Auth(Rol.BOTH)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try{
      const product = await this.productService.findOne(+id);
      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      return product;
    }catch(error){
      throw new BadRequestException(`Failed to obtain the product with ID ${id}`);
    }
  }

  //Actualizar un producto
  @Auth(Rol.BOTH)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    try{
      const updatedProduct = await this.productService.update(+id, updateProductDto);
      if (!updatedProduct) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      return {
        message: `Product with ID ${id} updated succesfully`,
        updatedProduct,
      }
    }catch(error){
      throw new BadRequestException(`Failed to update the product with ID ${id}`);
    }
  }

  //Eliminar producto
  @Auth(Rol.BOTH)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try{
      const result = await this.productService.remove(+id);
      if (!result){
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      return {
        message: `Product with ID ${id} succesfully removed`,
      };
    }catch(error){
      throw new BadRequestException(`Failed to remove the product with ID ${id}`);
    }
  }
}
