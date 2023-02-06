import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaginateResult } from 'mongoose';
import { Public } from 'src/auth/decorators/public.decorator';
import { UserDocument } from 'src/users/models/_user.model';
import { ApiOkResponseGeneral } from 'src/utils/pagination/apiOkResponseGeneral';
import { BagsService } from './bags.service';
import { CreateBagDto } from './dto/create-bag.dto';
import { FilterQueryOptionsBag } from './dto/filter-bags.dto';
import { UpdateBagDto } from './dto/update-bag.dto';
import { Bag, BagDocument } from './models/bag.model';

@ApiTags('BAGS')
@Controller('bags')
export class BagsController {
  constructor(private readonly bagsService: BagsService) {}

  @Public()
  @Post()
  create(@Body() createBagDto: CreateBagDto) {
    console.log(createBagDto);
    return this.bagsService.create(createBagDto);
  }

  @Public()
  @ApiOkResponseGeneral(Bag)
  @Get()
  findAll(
    @Query() FilterQueryOptionsBag: FilterQueryOptionsBag,
  ): Promise<PaginateResult<BagDocument> | BagDocument[]> {
    return this.bagsService.findAll(FilterQueryOptionsBag);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bagsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBagDto: UpdateBagDto) {
    return this.bagsService.update(+id, updateBagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bagsService.remove(+id);
  }
}
