import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { IsNonPrimitiveArray } from 'src/utils/customValidators';
import { NamesDto } from './names.dto';
import { QuantityDto } from './quantity.dto';

export class CreateBagDto {
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => NamesDto)
  names: NamesDto;

  @IsNumber()
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @ValidateNested({ each: true })
  @IsNonPrimitiveArray()
  @Type(() => QuantityDto)
  quantities: QuantityDto[];
}
