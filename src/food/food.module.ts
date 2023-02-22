import { Module } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Food, FoodSchema } from './models/food.model';
import { FoodRepository } from './food.repository';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Food.name,
        schema: FoodSchema,
      },
    ]),
    CategoriesModule,
  ],
  controllers: [FoodController],
  providers: [FoodService, FoodRepository],
  exports: [FoodService, FoodRepository],
})
export class FoodModule {}
