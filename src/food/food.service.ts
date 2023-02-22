import { Injectable } from '@nestjs/common';
import { CategoriesService } from 'src/categories/categories.service';
import { User, UserDocument } from 'src/users/models/_user.model';
import { CreateFoodDto, FilterQueryOptionsFood } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { FoodRepository } from './food.repository';

@Injectable()
export class FoodService {
  constructor(
    private readonly FoodRepository: FoodRepository,
    private readonly CategoriesService: CategoriesService,
  ) {}
  create(createFoodDto: CreateFoodDto) {
    return this.FoodRepository.create(createFoodDto);
  }

  async findAll(
    FilterQueryOptionsFood: FilterQueryOptionsFood,
    user: UserDocument,
  ) {
    const isFav = await this.CategoriesService.checkFavo(
      FilterQueryOptionsFood.category,
      user._id,
    );

    const food = await this.FoodRepository.findAllWithPaginationOption(
      FilterQueryOptionsFood,
      ['name', 'category'],
      {
        sort: { price: 1 },
        populate: [
          { path: 'category', select: 'name' },
          { path: 'customer', select: 'photo username ' },
        ],
      },
    );
    food['isFav'] = isFav ? true : false;
    return food;
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
