import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/users/models/_user.model';
import { BaseAbstractRepository } from 'src/utils/base.abstract.repository';
import { Category, CategoryDocument } from './models/category.model';

@Injectable()
export class CategoryRepository extends BaseAbstractRepository<Category> {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {
    super(categoryModel);
  }

  async getMyFavourits(UserDocument: UserDocument) {
    return this.categoryModel.find({ fans: UserDocument.id }, { fans: 0 });
  }
  async makeFavourite(categoryId: string, UserDocument: UserDocument) {
    return this.categoryModel.updateOne(
      { _id: categoryId },
      { $addToSet: { fans: UserDocument.id } as any },
    );
  }

  async delFavourite(categoryId: string, UserDocument: UserDocument) {
    return this.categoryModel.updateOne(
      { _id: categoryId },
      {
        $pull: { fans: UserDocument.id } as any,
      },
    );
  }
}
