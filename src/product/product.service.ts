/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';


@Injectable()
export class ProductService {

  constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>){}

  //Crear un nuevo producto
  async create(createProductDto: CreateProductDto): Promise<{message: string, product: Product}>{
    try {
      const newProduct = this.productRepository.create(createProductDto);
      const saveProduct = await this.productRepository.save(newProduct);
      return {
        message: 'Succesfully created product',
        product: saveProduct,
      };
    }catch(error) {
      throw new BadRequestException("The product was not created");
    }
  }

  //Obtener todos los productos
  async findAll(): Promise<Product[]> {
    try{
      return await this.productRepository.find();
    }catch(error){
      throw new BadRequestException("Failed to obtain the products");
    }
  }

  //Obtener un producto por su id
  async findOne(id: number): Promise<Product> {
    try{
      const product = await this.productRepository.findOneBy({ id });
      if(!product){
        throw new NotFoundException(`Product with ID ${id} not found`);  //Sil la variable product es null o undefined significa que no existe un producto con el id especificado en la base de datos. El error indica que el producto no existe.
      }
      return product;
    }catch(error){
      throw new BadRequestException(`Failed to get product with ID ${id}`); //Hubo un problema al procesar la solicitud para obtener el producto
    }
  }

  //Actualizar un producto
  async update(id: number, updateProductDto: UpdateProductDto): Promise <{message: string, product: Product}>{
    try{
      const product = await this.findOne(id); //Verifica si el producto existe
      const updatedProduct = this.productRepository.merge(product,updateProductDto); //Para combinar los cambios
      const savedProduct = await this.productRepository.save(updatedProduct);
      return {
        message: 'Product updated successfully',
        product: savedProduct,
      };
    }catch (error){
      throw new BadRequestException()
    }
  }

  //Eliminar un producto
  async remove(id: number): Promise<{ message: string }> {
    try{
      const product = await this.findOne(id) //Verifica si el producto existe
      await this.productRepository.remove(product);
      return { message: "Product succesfully removed"};
    } catch (error){
      throw new BadRequestException(`Failed to delete product with ID ${id}`)
    }
  }
}
