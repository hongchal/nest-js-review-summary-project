import { Controller, Post, Body } from '@nestjs/common';
import { ReviewService } from './review.service';
import { WriteReviewDto } from './dto/write-review.dto';
import { Review } from './review.entity';

@Controller('review')
export class ReviewController {
    constructor(private reviewService: ReviewService){}

    @Post()
    createReview(
        @Body() writeReviewDto: WriteReviewDto
    ): Promise<Review> {
        return this.reviewService.createReview(writeReviewDto)
    }
}
