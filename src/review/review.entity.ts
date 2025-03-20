import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Product } from "src/product/product.entity";
import { User } from "src/auth/user.entity";

@Entity()
export class Review extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Product, (product) => product.reviews)
    @JoinColumn({name: 'product_id'})
    product!: Product

    @ManyToOne(() => User, (user) => user.reviews)
    @JoinColumn({name: 'user_id'})
    user!: User;

    @Column()
    comment: string;    

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt!: Date;

    @UpdateDateColumn({name: 'updeated_at', type: 'timestamp'})
    updatedAt! : Date;
}