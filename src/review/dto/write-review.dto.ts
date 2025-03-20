import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class WriteReviewDto{
    @IsNumber()
    @IsNotEmpty()
    productId: number;

    @IsString()
    @Length(1)
    comment: string;
}