import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './models/category.model';
import { CategoryRepository } from './categories.repository';
import { FoodModule } from 'src/food/food.module';
import { forwardRef } from '@nestjs/common/utils';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoryRepository],
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    forwardRef(() => FoodModule),
    HttpModule,
  ],
  exports: [CategoriesService],
})
export class CategoriesModule {}
