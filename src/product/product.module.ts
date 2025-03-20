import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';

@Module({
  imports : [
    TypeOrmModule.forFeature([Product])
  ],
  controllers: [
    ProductController
  ],
  providers: [
    ProductService,
    ProductRepository
  ],
  exports: [
    ProductRepository
  ]
})
export class ProductModule {}
