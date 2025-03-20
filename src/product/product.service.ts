import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductRepository)
        private productRepository: ProductRepository
    ) {}

    async createProduct(createProductDto: CreateProductDto): Promise<Product>{
        return this.productRepository.createProduct(createProductDto)
    }

    async getProductById(id: number): Promise<Product> {
        const found = await this.productRepository.findOne({
            where: {id}
        })

        if(!found){
            throw new NotFoundException(`Product with ID "${id}" not found`)
        }

        return found
    }

    async updateProductInfo(id: number ,updateProductDto: UpdateProductDto): Promise<Product> {
        const product = await this.getProductById(id);
        
        Object.assign(product, 
            updateProductDto.name !== undefined && { name: updateProductDto.name },
            updateProductDto.price !== undefined && { price: updateProductDto.price },
            updateProductDto.description !== undefined && { description: updateProductDto.description }
        );

        return await this.productRepository.save(product);
    }
}
