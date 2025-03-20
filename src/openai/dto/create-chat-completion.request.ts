import { IsNotEmpty, IsString, IsArray, ValidateNested } from "class-validator";
import {Type} from 'class-transformer'

export class createChatCompletionRequest {
    @IsArray()
    @ValidateNested( {each: true})
    @Type(() => ChatCompletionMessageDto)
    messages: ChatCompletionMessageDto[]
}

export class ChatCompletionMessageDto{
    @IsString()
    @IsNotEmpty()
    role: string;
    
    @IsString()
    @IsNotEmpty()
    content: string;
}