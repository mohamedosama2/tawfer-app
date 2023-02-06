import { Module } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Food, FoodSchema } from './models/food.model';
import { FoodRepository } from './food.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Food.name,
        schema: FoodSchema,
      },
    ]),
  ],
  controllers: [FoodController],
  providers: [FoodService, FoodRepository],
})
export class FoodModule {}
