// dto/create-product.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  
  @IsString({message: 'El nombre debe ser una cadena de caracteres'})
  @IsNotEmpty({message: 'El campo no puede estar vacio'})
  name: string;

  @IsString({message: 'La descripcion debe ser una cadena de caracteres'})
  @IsNotEmpty({message: 'El campo no puede estar vacio'})
  description: string;
}


