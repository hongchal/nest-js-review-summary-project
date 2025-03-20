import { Review } from "./review.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { WriteReviewDto } from "./dto/write-review.dto";
import { ProductRepository } from "src/product/product.repository";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ReviewRepository extends Repository<Review>{

    constructor(
        private datasource: DataSource,

        @InjectRepository(ProductRepository)
        private productRepository: ProductRepository
    ) {
        super(Review, datasource.createEntityManager());
        
    }

    async createAndSave(wirteReviewDto: WriteReviewDto): Promise<Review> {
        const { productId, comment } = wirteReviewDto
        const product = await this.productRepository.findOne({where: {id: productId}});

        if(!product){
            throw new NotFoundException(`product with ID "${productId}"not found`)
        }


        const review = this.create({
            product,
            comment
        })
        
        await this.save(review);

        return review
    }
}