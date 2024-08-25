/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //Ruta para registrar un nuevo usuario
  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return {
      message: 'User registered successfully',
      user,
    };
  }

  //Ruta para obtener todos los usuarios
  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return users;
  }

  //Ruta para obtener un usuario por su id
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(+id);
    if (!user){
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  //Ruta para obtener un usuario por su id
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(+id, updateUserDto);
    return {
      message: `User with ID ${id} has been updated successfully`,
      user,
    };
  }

  //Ruta para eliminar un usuario por su id
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.usersService.remove(+id);
    return { 
      message: `User with ID ${id} has been removed succesfully`
    };
  }

  //Ruta para login de usuario
  @Post('login')
  async login(@Body() LoginUserDto: CreateUserDto){
    const user = await this.usersService.findByEmailWithPassword(LoginUserDto.email);
    if (!user || !(await this.usersService.validatePassword(LoginUserDto.password, user.password))){
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return {
      message: 'Login successful',
      user,
    };
  }
}
