import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Query,
} from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto, FilterQueryOptionsFood } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { PaginateResult } from 'mongoose';
import { FoodDocument } from './models/food.model';
import { UserDocument } from 'src/users/models/_user.model';
import { AuthUser } from 'src/auth/decorators/me.decorator';
import ParamsWithId from 'src/utils/paramsWithId.dto';

@ApiBearerAuth()
@ApiTags('food')
@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @UseInterceptors(FileFieldsInterceptor([{ name: 'photo', maxCount: 1 }]))
  @ApiConsumes('multipart/form-data')
  @Post()
  create(@UploadedFiles() files, @Body() createFoodDto: CreateFoodDto) {
    if (files && files.photo)
      createFoodDto['photo'] = files.photo[0].secure_url;
    return this.foodService.create(createFoodDto);
  }

  @Get()
  async findAll(
    @Query() FilterQueryOptionsFood: FilterQueryOptionsFood,
  ): Promise<PaginateResult<FoodDocument> | Array<FoodDocument>> {
    return await this.foodService.findAll(FilterQueryOptionsFood);
  }

  @Get('categories')
  async findAllCategories() {
    return await this.foodService.findAllCategories();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFoodDto: UpdateFoodDto) {
    return this.foodService.update(+id, updateFoodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodService.remove(+id);
  }
}
