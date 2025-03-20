import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewRepository } from './review.repository';
import { WriteReviewDto } from './dto/write-review.dto';
import { Review } from './review.entity';

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(ReviewRepository)
        private reviewRepository: ReviewRepository
    ) {}

    async createReview(writeReviewDto: WriteReviewDto): Promise<Review>{
        return this.reviewRepository.createAndSave(writeReviewDto)
    }
}
