import { IntersectionType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { escapeRegExp } from 'lodash';
import { PaginationParams } from 'src/utils/pagination/paginationParams.dto';

export class FilterQueryBag {
  @IsOptional()
  @Transform(({ obj }) => {
    return new RegExp(escapeRegExp(obj.description), 'i');
  })
  description?: string;
}

export class FilterQueryOptionsBag extends IntersectionType(
  FilterQueryBag,
  PaginationParams,
) {}
