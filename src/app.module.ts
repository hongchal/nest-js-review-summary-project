import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMConfig } from './configs/typeorm.config';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { ConfigModule } from '@nestjs/config';
import { OpenaiModule } from './openai/openai.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeORMConfig),
    AuthModule,
    ProductModule,
    ReviewModule,
    ConfigModule.forRoot(),
    OpenaiModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
