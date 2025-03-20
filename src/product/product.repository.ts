import { Product } from "./product.entity";
import { Injectable } from "@nestjs/common";
import { Repository, DataSource } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";

@Injectable()
export class ProductRepository extends Repository<Product> {
    constructor(datasource: DataSource) {
        super(Product, datasource.createEntityManager());
    }

    async createProduct(createProductDto: CreateProductDto): Promise<Product> {
        const { name, price, description } = createProductDto;

        const product = this.create({
            name,
            price,
            description
        })

        await this.save(product)
        return product
    }
}