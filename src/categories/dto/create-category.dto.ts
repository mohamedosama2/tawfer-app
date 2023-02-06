import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { escapeRegExp } from 'lodash';
import { PaginationParams } from 'src/utils/pagination/paginationParams.dto';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  describtion: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: 'string', format: 'binary' })
  photo?: string;
}

export class FilterQueryCategory {
  @IsOptional()
  @Transform(({ obj }) => {
    return new RegExp(escapeRegExp(obj.name), 'i');
  })
  name?: string;

  /* @IsOptional()
    @IsEnum(CATEGORY)
    category?: CATEGORY; */
}

export class FilterQueryOptionsCategory extends IntersectionType(
  FilterQueryCategory,
  PaginationParams,
) {}
