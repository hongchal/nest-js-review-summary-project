import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { ReviewRepository } from './review.repository';
import { ProductRepository } from 'src/product/product.repository';

@Module({
  imports : [
    TypeOrmModule.forFeature([Review])
  ],
  providers: [
    ReviewService,
    ReviewRepository,
    ProductRepository
  ],
  controllers: [ReviewController]
})
export class ReviewModule {}
