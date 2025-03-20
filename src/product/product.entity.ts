import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Review } from "src/review/review.entity";
@Entity()  
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({name: 'price', type: 'float'})
    price: number;

    @CreateDateColumn({name: 'created_at', type: 'timestamp'})
    created_at!: Date; 

    @UpdateDateColumn({name: 'updated_at', type:'timestamp'})
    updated_at!: Date;

    @OneToMany(() => Review, (review) => review.product)
    reviews!: Review[]
}