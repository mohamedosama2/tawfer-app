import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { escapeRegExp } from 'lodash';
import { PaginationParams } from 'src/utils/pagination/paginationParams.dto';

export class CreateFoodDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsMongoId()
  category: string;

  @IsNotEmpty()
  @IsMongoId()
  customer: string;

  @IsString()
  @IsOptional()
  describtion?: string;

  @IsNumber()
  price: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: 'string', format: 'binary' })
  photo?: string;
}

export class FilterQueryFood {
  @IsOptional()
  @Transform(({ obj }) => {
    return new RegExp(escapeRegExp(obj.name), 'i');
  })
  name?: string;

  @IsMongoId()
  category: string;

  /* @IsOptional()
  @IsEnum(CATEGORY)
  category?: CATEGORY; */
}

export class FilterQueryOptionsFood extends IntersectionType(
  FilterQueryFood,
  PaginationParams,
) {}
