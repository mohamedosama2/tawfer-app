import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class QuantityDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  quantity: number;
}
