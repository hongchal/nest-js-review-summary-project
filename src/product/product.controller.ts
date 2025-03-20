import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {}
    
    @Post()
    createProduct(
        @Body() createProductDto: CreateProductDto
    ): Promise<Product> {
        return this.productService.createProduct(createProductDto);
    }

    @Get('/:id')
    getProductById(@Param('id') id:number): Promise<Product> {
        return this.productService.getProductById(id);
    }

    @Post('/:id/update')
    updateProductInfo(
        @Param('id', ParseIntPipe) id : number,
        @Body() updateProductDto: UpdateProductDto
    ): Promise<Product> {
        return this.productService.updateProductInfo(id, updateProductDto)
    }
}
