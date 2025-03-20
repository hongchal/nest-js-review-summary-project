import { Body, Controller, Post, Param } from '@nestjs/common';
import { createChatCompletionRequest } from './dto/create-chat-completion.request';
import { OpenaiService } from './openai.service';

@Controller('openai')
export class OpenaiController {
    constructor(
        private readonly openaiService: OpenaiService
    ){}


    @Post('/chatCompletion')
    async createChatCompletion(
        @Body() body: createChatCompletionRequest 
    ){
        return this.openaiService.createChatCompletion(body.messages)
    }

    @Post('/:productId/summerize')
    async productReviewSummerzie(
        @Param('productId') productId: number
    ) {
        const summary = this.openaiService.createSummary(productId)
        return summary
    }

}
 