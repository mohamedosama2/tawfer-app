import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthUser } from 'src/auth/decorators/me.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { PaginationParams } from 'src/utils/pagination/paginationParams.dto';
import { UserDocument, UserRole } from 'src/users/models/_user.model';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { subscribeNotificationDto } from './dto/subscribe-notification.dto';
import {
  BaseMessageWithTokenTesting,
  encodingDataForAllDevices,
} from './Types';
import { NotificationService } from './notification.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { FilterQuery, ObjectId } from 'mongoose';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

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
  food: Food;
}
@ApiBearerAuth()
@ApiTags('Notifications')
@Controller('Notifications')
export class NotificationController {
  constructor(
    private readonly NotificationService: NotificationService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  @Public()
  @Get('/')
  async hello() {
    return 'hello is working';
  }

  @Public()
  @Post('/send-many-docs')
  async setnManyDocs(@Body() SendFansBody: SendFansBody) {
    console.log(SendFansBody);
    return await this.NotificationService.sendManyNotificationsWithUserFilter(
      /*  { _id: { $in: usersIdArr.filter } }, */
      {},
      {
        body: `address of the ${SendFansBody.food.name} is : ${SendFansBody.food.address}`,
        link: 'www.google.com',
        requireInteraction: true,
        title: `the ${SendFansBody.food.name} of the category: ${SendFansBody.category.name} has new price : ${SendFansBody.food.price}`,
        imageUrl: SendFansBody.food.photo
          ? SendFansBody.food.photo
          : SendFansBody.category.photo
          ? SendFansBody.category.photo
          : 'https://media.istockphoto.com/photos/picturesque-morning-in-plitvice-national-park-colorful-spring-scene-picture-id1093110112?k=20&m=1093110112&s=612x612&w=0&h=3OhKOpvzOSJgwThQmGhshfOnZTvMExZX2R91jNNStBY=',
        icon: 'https://media.istockphoto.com/photos/picturesque-morning-in-plitvice-national-park-colorful-spring-scene-picture-id1093110112?k=20&m=1093110112&s=612x612&w=0&h=3OhKOpvzOSJgwThQmGhshfOnZTvMExZX2R91jNNStBY=',
        /*  actions: [
          {
            title: 'Hi',
            action: 'open',
            icon: 'https://media.istockphoto.com/photos/picturesque-morning-in-plitvice-national-park-colorful-spring-scene-picture-id1093110112?k=20&m=1093110112&s=612x612&w=0&h=3OhKOpvzOSJgwThQmGhshfOnZTvMExZX2R91jNNStBY=',
          },
          {
            title: 'Hi2',
            action: 'https://www.google.com/?hl=ar',
            icon: 'https://media.istockphoto.com/photos/picturesque-morning-in-plitvice-national-park-colorful-spring-scene-picture-id1093110112?k=20&m=1093110112&s=612x612&w=0&h=3OhKOpvzOSJgwThQmGhshfOnZTvMExZX2R91jNNStBY=',
          },
        ], */
      },
    );
  }

  @Get('/fetchAll')
  async fetchAll(
    @Query() queryParams: PaginationParams,
    @AuthUser() me: UserDocument,
  ) {
    return await this.NotificationService.fetchAll(me, queryParams);
  }

  @Post('/subscribe')
  async subscribeToken(
    @Body() { token, type }: subscribeNotificationDto,
    @AuthUser() me: UserDocument,
  ) {
    await this.NotificationService.subscribe(me, type, token);
    return 'Done';
  }

  @Get('/count-notifications')
  async countNotification(@AuthUser() me: UserDocument) {
    return await this.NotificationService.fetchCount(me);
  }

  @Post('/unsubscribe')
  async unSubscribeToken(
    @Body() { token }: subscribeNotificationDto,
    @AuthUser() me: UserDocument,
  ) {
    await this.NotificationService.unSubscribe(me, token);
    return 'Done';
  }

  @Public()
  @Post('/sendTestFcmWithEncodeing')
  async sendTestFcmWithEncodeing(
    @Body() notificationBody: CreateNotificationDto,
  ) {
    const notificationData = encodingDataForAllDevices({
      body: notificationBody.body,
      data: {
        title: 'Come',
      },
      title: notificationBody.title,
      actions: [{ action: 'Done', title: 'Hii' }],
      imageUrl: notificationBody.image,
      icon: 'https://media.istockphoto.com/photos/picturesque-morning-in-plitvice-national-park-colorful-spring-scene-picture-id1093110112?k=20&m=1093110112&s=612x612&w=0&h=3OhKOpvzOSJgwThQmGhshfOnZTvMExZX2R91jNNStBY=',
    });

    await this.NotificationService.sendTest({
      ...notificationData,
      token:
        'de8bjN9LhL6AU0zubVnjZn:APA91bHDogD00By4nlFT7Lkm5XjkJDoPj2wEIck82z9MOUx0Mcr81Hbe4CEShAE4i2ZhpcAApHk816lOrVFE6oRqWdl27ngsmvsTdu5gv6Lf0ziEBFF7QsCS5WMgTn_e9rY0db35ht2n',
    });
    return 'Done';
  }
}
