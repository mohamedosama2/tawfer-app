import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { FilterQueryOptionsFood } from 'src/food/dto/create-food.dto';
import { FoodRepository } from 'src/food/food.repository';
import { UserDocument } from 'src/users/models/_user.model';
import { CategoryRepository } from './categories.repository';
import {
  CreateCategoryDto,
  FilterQueryOptionsCategory,
} from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

interface Category {
  _id: string;
  photo: string;
  describtion: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  fans: string[];
  __v?: number;
}
interface Food {
  _id: string;
  photo: string;
  customer: {
    role: string;
    username: string;
    _id: string;
    email: string;
    phone: string;
    photo?: string;
  };
  category: string;
  price: number;
  describtion: string;
  address: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface SendFansBody {
  category: Category;
  Food: Food;
}

@Injectable()
export class CategoriesService {
  constructor(
    private readonly CategoryRepository: CategoryRepository,
    private readonly FoodRepository: FoodRepository,
    private readonly httpService: HttpService,
  ) {}
  create(createCategoryDto: CreateCategoryDto) {
    return this.CategoryRepository.createDoc(createCategoryDto);
  }

  findAll(FilterQueryOptionsCategory: FilterQueryOptionsCategory) {
    return this.CategoryRepository.findAllWithPaginationOption(
      FilterQueryOptionsCategory,
      ['name'],
      {
        select: '-fans',
      },
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

  async sendToFans(foodId: string) {
    const food = await this.FoodRepository.findOne(
      { _id: foodId },
      {
        populate: {
          path: 'customer',
          select: '_id photo username phone email',
        },
      },
    );
    const category = await this.CategoryRepository.findOne({
      _id: food.category,
    });
    /*    console.log('category: ', category);
    console.log('food: ', food); */
    const resp = await this.httpService.post(
      `http://${process.env.NOTIFICATION_SERVICE_SERVICE_HOST}/Notifications/send-many-docs`,
      { category, food },
    );
    resp.forEach((value) => {
      console.log(value.data);
    });
    const resp2 = await this.httpService.post(
      `http://${process.env.NOTIFICATION_SERVICE}/Notifications/send-many-docs`,
      { category, food },
    );

    /*  await axios.post(
      `http://${process.env.NOTIFICATION_SERVICE_SERVICE_HOST}/Notifications/send-many-docs`,
    ); */
    return 'done';
  }

  async checkFavo(catId: string, customerId: string) {
    return await this.CategoryRepository.findOne({
      fans: customerId,
      _id: catId,
    });
  }

  async findOne(_id: string, customerId: string) {
    const isFav = await this.checkFavo(_id, customerId);
    const category = await this.CategoryRepository.findOne({ _id });

    const { name, photo, id, describtion } = category;
    return { name, photo, id, describtion, isFav: isFav ? true : false };
  }
  /* "_id": "63e14d0a3d52bdd415eed945",
    "fans": [
      "63e37c1f4efaff9e081c78b5",
      "63e14a7607938a18be183645"
    ],
    "photo": "http://www.gebo.gov.eg/content/images/thumbs/default-image_415.png",
    "describtion": "احلي طعطعطععععععع",
    "name": "طعمية",
    "createdAt": "2023-02-06T18:55:06.848Z",
    "updatedAt": "2023-02-08T23:14:06.971Z",
    "__v": 0 */

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
