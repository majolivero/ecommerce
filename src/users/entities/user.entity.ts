/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from '../../order/entities/order.entity';
import { Rol } from '../../common/enums/rol.enum';

@Entity({name:'users'})
export class User {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique:true,nullable: false})
    email:string;

    @Column({nullable: false, select: false }) //select:false para que no me devuelva la password
    password:string;

    @Column({default:'user', enum: Rol})
    rol:string;

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];
}
