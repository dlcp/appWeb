// products.controller.ts
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseIntPipe, Patch, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './interfaces/product.interface';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  getSpecialProducts() {
    const products = this.productsService.getAll();
    return {
      message: "Aquí están todos los productos",
      data: products,
    }
  }

  @Get(':id')
  find(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.getId(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ transform: true }))
  async createProduct(@Body() createProductDto: CreateProductDto) {
    const newProduct = this.productsService.insert(createProductDto);
    return {
      id: newProduct.id,
      name: newProduct.name,
      description: newProduct.description,
    };
  }

  @Put(':id')
@UsePipes(new ValidationPipe({ transform: true }))
async update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
  const updatedProduct = this.productsService.update(id, updateProductDto);
  if (!updatedProduct) {
    throw new NotFoundException(`no se encuentra el producto con el id "${id}".`);
  }
  return updatedProduct;
}

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  partialUpdate(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    const updatedProduct = this.productsService.updatePartial(id, updateProductDto);
    if (!updatedProduct) {
      throw new NotFoundException(`no se encuentra el producto con el id "${id}".`);
    }
    return updatedProduct;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id', ParseIntPipe) id: number) {
    this.productsService.delete(id);
    return this.productsService.getAll();
  }
}
