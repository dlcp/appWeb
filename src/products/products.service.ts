// products.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './interfaces/product.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Vela aromática',
      description: 'Esta vela lanza ricos olores',
    },
    {
      id: 2,
      name: 'Marco de fotos pequeño',
      description: 'Marco ideal para tus fotos 10x15',
    }
  ];

  getAll(): Product[] {
    return this.products;
  }

  getId(id: number): Product {
    const product = this.products.find((item: Product) => item.id === id);
    if (product) {
      return product;
    } else {
      throw new NotFoundException(`No encontramos el producto ${id}`);
    }
  }

  insert(createProductDto: CreateProductDto): Product {
    const newProduct = {
      id: this.lastId() + 1,
      ...createProductDto,
    };
    this.products = [...this.products, newProduct];
    return newProduct;
  }

  // update(name: string, updateProductDto: UpdateProductDto): Product | null {
  //   const productIndex = this.products.findIndex(item => item.name === name);
  //   if (productIndex === -1) {
  //     throw new NotFoundException(`Producto con el nombre "${name}" no encontrado.`);
  //   }
  //   const updatedProduct = {
  //     ...this.products[productIndex],
  //     ...updateProductDto,
  //   };
  //   this.products[productIndex] = updatedProduct;
  //   return updatedProduct;
  // }
  update(id: number, updateProductDto: UpdateProductDto): Product | null {
    const productIndex = this.products.findIndex(item => item.id === id);
    if (productIndex === -1) {
      throw new NotFoundException(`Producto con el id "${id}" no encontrado.`);
    }
    const updatedProduct = {
      ...this.products[productIndex],
      ...updateProductDto,
    };
    this.products[productIndex] = updatedProduct;
    return updatedProduct;
  }
  

  updatePartial(id: number, updateProductDto: UpdateProductDto): Product | null {
    const productIndex = this.products.findIndex(item => item.id === id);
    if (productIndex === -1) {
      throw new NotFoundException(`Producto con el id ${id} no encontrado.`);
    }
    const updatedProduct = {
      ...this.products[productIndex],
      ...updateProductDto,
    };
    this.products[productIndex] = updatedProduct;
    return updatedProduct;
  }

  delete(id: number): void {
    const initialLength = this.products.length;
    this.products = this.products.filter(product => product.id !== id);
    if (this.products.length === initialLength) {
      throw new NotFoundException(`El producto con el id ${id} no encontrado.`);
    }
  }

  private lastId(): number {
    return this.products[this.products.length - 1]?.id || 0;
  }
}
