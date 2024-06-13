import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateProductDto {

  @IsString({message: 'Nombre debe contener caracteres'})
  @IsOptional({message: 'debe contener caracteres'})
  name?: string;

  @IsString({message: 'la descripcion debe contener caracteres'})
  @IsOptional({message: 'debe contener caracteres'})
  description?: string;
}
