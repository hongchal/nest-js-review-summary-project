import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { WriteReviewDto } from './dto/write-review.dto';
import { Review } from './review.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('review')
export class ReviewController {
    constructor(private reviewService: ReviewService){}

    @Post()
    @UseGuards(AuthGuard())
    createReview(
        @Body() writeReviewDto: WriteReviewDto,
        @GetUser() user: User
    ): Promise<Review> {
        return this.reviewService.createReview(writeReviewDto, user)
    }
}
