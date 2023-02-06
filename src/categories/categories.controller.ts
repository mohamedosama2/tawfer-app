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
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { PaginateResult } from 'mongoose';
import { AuthUser } from 'src/auth/decorators/me.decorator';
import { UserDocument } from 'src/users/models/_user.model';
import ParamsWithId from 'src/utils/paramsWithId.dto';
import { CategoriesService } from './categories.service';
import {
  CreateCategoryDto,
  FilterQueryOptionsCategory,
} from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryDocument } from './models/category.model';

@ApiTags('category')
@ApiBearerAuth()
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseInterceptors(FileFieldsInterceptor([{ name: 'photo', maxCount: 1 }]))
  @ApiConsumes('multipart/form-data')
  @Post()
  create(@UploadedFiles() files, @Body() createCategoryDto: CreateCategoryDto) {
    if (files && files.photo)
      createCategoryDto['photo'] = files.photo[0].secure_url;
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll(
    @Query() FilterQueryOptionsCategory: FilterQueryOptionsCategory,
  ): Promise<PaginateResult<CategoryDocument> | CategoryDocument[]> {
    return this.categoriesService.findAll(FilterQueryOptionsCategory);
  }

  @Get('favourits')
  async findFavourits(@AuthUser() UserDocument: UserDocument) {
    return await this.categoriesService.getMyFavourits(UserDocument);
  }

  @Post('makeFavourite')
  async makeFavourite(
    @AuthUser() UserDocument: UserDocument,
    @Query() { id }: ParamsWithId,
  ) {
    return await this.categoriesService.makeFavourite(id, UserDocument);
  }

  @Post('removeFavourite')
  async removeFavourite(
    @AuthUser() UserDocument: UserDocument,
    @Query() { id }: ParamsWithId,
  ) {
    return await this.categoriesService.delFavourite(id, UserDocument);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
