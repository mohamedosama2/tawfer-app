import { Injectable } from '@nestjs/common';
import { User, UserDocument } from 'src/users/models/_user.model';
import { CreateFoodDto, FilterQueryOptionsFood } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { FoodRepository } from './food.repository';

@Injectable()
export class FoodService {
  constructor(private readonly FoodRepository: FoodRepository) {}
  create(createFoodDto: CreateFoodDto) {
    return this.FoodRepository.create(createFoodDto);
  }

  findAll(FilterQueryOptionsFood: FilterQueryOptionsFood) {
    return this.FoodRepository.findAllWithPaginationOption(
      FilterQueryOptionsFood,
      ['name', 'category'],
      { sort: { price: 1 }, populate: [{ path: 'category', select: 'name' }] },
    );
  }

  findAllCategories() {
    return this.FoodRepository.findAllCategories();
  }

  findOne(id: number) {
    return `This action returns a #${id} food`;
  }

  update(id: number, updateFoodDto: UpdateFoodDto) {
    return `This action updates a #${id} food`;
  }

  remove(id: number) {
    return `This action removes a #${id} food`;
  }
}
