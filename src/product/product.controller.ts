import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductDocument } from './product.schema';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService){

    }
    @Post()
    createProduct(
        @Body('name') name: string,
        @Body('price') price: number,
        @Body('description') description?: string,

    ): Promise<ProductDocument> {
        return this.productService.create(name, price, description)
    }
    @Get()
    findAllProducts(
        ): Promise<ProductDocument[]> {
            return this.productService.findAll();
        }
    @Get(':id')
    findUnique(    
        @Param('id') id: string
    ): Promise<ProductDocument> {
        return this.productService.find(id);
    }
    
    @Patch(':id')
    updateProduct(    
        @Param('id') id: string,
        @Body('name') name: string,
        @Body('price') price: number,
        @Body('description') description?: string

    ): Promise<ProductDocument> {
        return this.productService.update(id, name, price, description);
    }
    @Delete(':id')
    deleteProduct(
        @Param('id') id : string
    ){
        return this.productService.delete(id)
    }

}
