import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ChatCompletionMessageDto } from './dto/create-chat-completion.request';
import { ChatCompletionMessageParam } from 'openai/resources/chat';
import { ProductRepository } from 'src/product/product.repository';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs'; 

@Injectable()
export class OpenaiService {
    constructor(
        private readonly openai: OpenAI,
        @InjectRepository(ProductRepository)
        private productRepository: ProductRepository
    ){}

    async createChatCompletion(
        messages: ChatCompletionMessageDto[]
    ){
        return this.openai.chat.completions.create({
            messages: messages as ChatCompletionMessageParam[],
            model: 'gpt-4o'
        });
    }

    async createSummary(productId: number){
        const product = await this.productRepository.findOne( {
            where : { id: productId },
            relations: ['reviews']
        });

        if(!product){
            throw new Error(`Product with ID ${productId} not found.`);
        }

        const commentsText = product.reviews.map(
            (review) => review.comment
        ).join('\n\n');

        const filePath = `reviews_comments_product_${productId}.txt`

        fs.writeFileSync(filePath, commentsText, 'utf8'); // 파일로 저장
        console.log(`Comments saved to ${filePath}`);

        const document = fs.readFileSync(filePath, 'utf-8');
        
        const prompt = `유저들의 리뷰들을 읽고 상품에 대해 요약해줘: \n\n${document}`

        try{
            const response = await this.openai.chat.completions.create({
                model: 'gpt-4o',
                messages: [
                    { role: 'system', content: 'You are a helpful assistant.' },
                    { role: 'user', content: prompt },
                ]
            })

            const summary = response.choices[0].message.content;
            return summary
        } catch (error){
            console.error('Error during summarization:', error);
            throw new Error('Failed to summarize the document.');
        }

    }
}
