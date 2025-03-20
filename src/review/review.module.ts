import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { ReviewRepository } from './review.repository';
import { ProductRepository } from 'src/product/product.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports : [
    TypeOrmModule.forFeature([Review]),
    AuthModule
  ],
  providers: [
    ReviewService,
    ReviewRepository,
    ProductRepository
  ],
  controllers: [ReviewController]
})
export class ReviewModule {}
