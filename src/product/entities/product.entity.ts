/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from '../../order/entities/order.entity';

@Entity({name:'products'})
export class Product {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column('decimal')
    price:number;

    @Column({type: 'text', nullable: true})
    description:string;

    @ManyToMany(() => Order, order => order.products)
    orders: Order[];
}
