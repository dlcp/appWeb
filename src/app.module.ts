import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { CustomersController } from './customers/customers.controller';
import { UsersController } from './users/users.controller';
import { ProductsService } from './products/products.service';
import { TagsModule } from './tags/tags.module';
import { ProductModule } from './products/products.module';

@Module({
  imports: [TagsModule, ProductModule],
  controllers: [AppController, ProductsController, CustomersController, UsersController,ProductsController],
  providers: [AppService, ProductsService],
})
export class AppModule {}
