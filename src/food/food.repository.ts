import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AnyObject, Model, OnlyFieldsOfType, _UpdateQueryDef } from 'mongoose';
import { UserDocument } from 'src/users/models/_user.model';
import { BaseAbstractRepository } from 'src/utils/base.abstract.repository';
import { Food, FoodDocument } from './models/food.model';

@Injectable()
export class FoodRepository extends BaseAbstractRepository<Food> {
  constructor(@InjectModel(Food.name) private foodModel: Model<FoodDocument>) {
    super(foodModel);
  }
  async findAllCategories() {
    return this.foodModel.aggregate([
      {
        $group: {
          _id: { name: '$category' },
          photo: { $last: '$photo' },
          name: { $last: '$name' },
          describtion: { $last: '$describtion' },
          numberOfThisCategory: { $count: {} },
          minimumPrice: { $min: '$price' },
        },
      },
    ]);
  }
}
