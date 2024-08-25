/* eslint-disable prettier/prettier */
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Product } from '../../product/entities/product.entity';

@Entity({name:'orders'})
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number; 

    @ManyToOne(() => User, user => user.orders)
    user:User;

    @ManyToMany(() => Product, product => product.orders)
    @JoinTable({
        name: 'order_products', //Nombre de la tabla intermedia
        joinColumn: { name: 'order_id', referencedColumnName:'id' },
        inverseJoinColumn: { name: 'product_id', referencedColumnName: 'id'},
    })
    products: Product[];

    @Column()
    totalPrice: number;
}
