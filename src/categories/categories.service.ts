import { Injectable } from '@nestjs/common';
import { FilterQueryOptionsFood } from 'src/food/dto/create-food.dto';
import { UserDocument } from 'src/users/models/_user.model';
import { CategoryRepository } from './categories.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly CategoryRepository: CategoryRepository) {}
  create(createCategoryDto: CreateCategoryDto) {
    return this.CategoryRepository.createDoc(createCategoryDto);
  }

  findAll(FilterQueryOptionsFood: FilterQueryOptionsFood) {
    return this.CategoryRepository.findAllWithPaginationOption(
      FilterQueryOptionsFood,
      ['name'],
    );
  }

  getMyFavourits(UserDocument: UserDocument) {
    return this.CategoryRepository.getMyFavourits(UserDocument);
  }
  makeFavourite(foodId: string, UserDocument: UserDocument) {
    return this.CategoryRepository.makeFavourite(foodId, UserDocument);
  }
  delFavourite(foodId: string, UserDocument: UserDocument) {
    return this.CategoryRepository.delFavourite(foodId, UserDocument);
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
