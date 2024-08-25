/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private readonly userRepository:Repository<User>) {}

  //Para crear el login y el register solo necesito el metodo create y findOneByEmail
  create(createUserDto: CreateUserDto): Promise <User> {
    const salt = bcrypt.genSaltSync(10);
    createUserDto.password = bcrypt.hashSync(createUserDto.password, salt);
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  //Este metodo retorna si existe o no el usuario en la base de datos
  findOneByEmail(email:string): Promise<User | undefined>{
    return this.userRepository.findOneBy({email})
  }

  findByEmailWithPassword(email: string): Promise<User | undefined>{
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'email' , 'password' , 'rol'] 
    })
  }

  //Obtener todos los usuarios
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  //Obtener un usuario por su ID
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: {id} });
    if(!user){
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  //Actualizar un usuario
  async update(id: number, updateUserDto: UpdateUserDto): Promise<{ message: string; user: User}> {
    const user = await this.findOne(id);
    Object.assign(user, updateUserDto);
    const updateUser = await this.userRepository.save(user);

    return {
      message: `User with ID ${id} has been updated successfully`,
      user: updateUser,
    }
  }

  //Eliminar un usuario
  async remove(id: number): Promise <{ message: string} > {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);

    return{
      message: `User with ID ${id} has been removed successfully`,
    };
  }

  async validatePassword(plainPassword: string, hashedPassword:string): Promise<boolean>{
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
