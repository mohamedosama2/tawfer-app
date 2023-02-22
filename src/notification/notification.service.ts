import {
  BadRequestException,
  Injectable,
  OnApplicationBootstrap,
} from '@nestjs/common';
import * as admin from 'firebase-admin';
import { findKey, matchesProperty } from 'lodash';
import {
  DeviceType,
  UserDocument,
  PushToken,
} from 'src/users/models/_user.model';
import { UsersService } from 'src/users/users.service';
import { NotificationDocument } from './notification.model';
import {
  BaseMessageWithToken,
  BaseMessageWithTokenTesting,
  encodingDataForAllDevices,
  MessageBody,
  queryParamsWithId,
  SendNotificationMethod,
} from './Types';
import { NotificationRepository } from './notifications.repository';
import { PaginationParams } from 'src/utils/pagination/paginationParams.dto';
import { AnyObject, FilterQuery } from 'mongoose';
import { UserRepository } from 'src/users/users.repository';
import { ServiceAccount } from 'firebase-admin';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationService implements OnApplicationBootstrap {
  onApplicationBootstrap(): void {
    this.configurationHandler();
  }

  constructor(
    private readonly NotificationRepositary: NotificationRepository,
    private readonly UserRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {}

  configurationHandler() {
    const adminConfig: ServiceAccount = {
      projectId: 'tawfeer-44539',
      privateKey:
        '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC7PdgV4ilRJdwV\n2Rrmtf9ckYXy2XHBpezSuVzTfLvuEbJb9p05erG0ojjJPwmwdU5z0l6MngEmb6PM\nUGcsKK0L9bVvotGf6xS13wDMjsO1cOMZpsOq00lGWZsxMrnFM0PEY392kB10Vs6w\nZqh80VwKUNX8JHTvJXVvqkBYYeeDDt/DnW+2ke8BefSAGKUlRq66rNnSYs76NNYH\nJ8UVxaN/7EFxO5FfHRAdfEPAD/8mWSZMmEctgxQBpvUXqDPoyr8CuK4VvhY4y13h\nYBNojVY4vT/wDGt098NDJVCX+UHSVuUk6CNt7/PoPIJt1WEr5tbVwWWBj3jyTnbf\ndQMwOx3TAgMBAAECggEAMDg5hU00gbrjxlaeaGrXRBIP8l4QPyQJbK0i3C4DwcgZ\n7DgC/nH8AL5ELIOI7cIP/aDgC4uHVUwr3SqZn1QsWGejHYhLPslOEJZJAOUFPp0/\nRvRc8ImwFadu4YkkMUZF/fX3teNgSn0uhlwxqM9LyjZOHTyQRqQZbbPlFT3FXskN\ngA6LC+///mssNEZWpYfBVZUReOz6arbeYAeqiTfeOFKQmx8JTYxCqyHAVOCVJIHt\nL4/7c467Eyqmf+BEk6TUetCyt9EMHjo7yZ+h+Mj/pGtE56gumA7DcOjzl4797tlA\nLINzaFNDdbNYhHI4c8TBY8fuqRIuzfwyiOA9etE0VQKBgQDiWFY3L9xxqxp6JLUn\naIKrPUFNxDGq7O0D1NsoXoP3AVocEBwrpH3wvPagTJxv+xoLXkIOBtSlwd4YzXzp\nINHTaOIQndoeVByPFbeGxqVRFCoxcXu1+8tgb2ngOcX6fYSlDKaLy6Q7U2t15YIR\nl9tqsUl7n2lH9kSfxjeAeChClQKBgQDTxfe+8FbLycT/EE5HnKYPAzg3oyiqC03q\n1L/ONB86WfVS6UjkFAOR91zWN3xLuPYTSVPs0SFhWahzh9qTXpnOhXzTr8IdM+Sd\n0eDnsg2ha9nNrK7AzN+NS5HPW7JAScS+KR0bSgHTP1bvRsAB1ZFY00axpcRrZPiz\nL9v/N9bsxwKBgQC0ZaVpXKr8qVtz6Be9re0fH7YRjgHr8eNBf3+gYBwbXKd94FUj\nb3m0ylZiEk1IbsAmOVy6IzWOWsJx0Czy/WZecaRji/vQ2kbcv3lDYMVXppOuTn1D\n4MgKNyISRNmGuE1k4n1Gw+pEIktubppI/VgyY9RmQ/o8EYpGMUwBB0NHNQKBgFYg\n57eyS7qqHwKVgSDC5w6oAo8uPnWaD2B4kmGs9R5oQ8wqsMiCE0mkTw+YlWa+nOYP\nJqDkFS1gp5AFKrJRAUDrLW9yxgHWfx5oo43X7o8+K+DoYFJtgGYY2/53jrFyzx9/\n3SSiHsfptNOv9JtKXsi/dLr/bjk3YaaOymysKy81AoGAf/NhLhqHE7RjW/3YPzxV\n1lupVc9t/K6Nb1SMoJCcCS2XGDadTiTOpwVhUfE9iaUY+n16rpjoODjqHN5iozR7\n+7+OSG0pyC2az38XYQMm9oz28YqBqKcNt6KfzbL9SSAoPhiox3vXzNj24O48k4NG\nf6inkiG7qbOmmEyI79NgRL0=\n-----END PRIVATE KEY-----\n',
      clientEmail:
        'firebase-adminsdk-p6ts9@tawfeer-44539.iam.gserviceaccount.com',
    };
    // Initialize the firebase admin app
    admin.initializeApp({
      credential: admin.credential.cert(adminConfig),
      databaseURL: 'https://xxxxx.firebaseio.com',
    });
  }
  async sendManyNotificationsWithUserFilter(
    filter: FilterQuery<UserDocument>,
    message: MessageBody,
  ) {
    const userCounts = await this.UserRepository.fetchCounts(filter);

    let chunkCount = Math.ceil(userCounts / 1000);

    for (let i = 0; i < chunkCount; i++) {
      let users = await this.UserRepository.fetchUsersByFilter(filter, i);
      const usersIds = users.map((user) => user._id);
      let prmoises = [];
      await this.NotificationRepositary.create({
        title: message.title,
        body: message.body,
        targetUsers: usersIds,
      });

      for (let i = 0; i < users.length; i++) {
        prmoises.push(
          (users[i] as SendNotificationMethod).sendNotification(
            encodingDataForAllDevices(message),
          ),
        );
      }
      await Promise.all(prmoises);
    }
  }

  async sendMany(
    message: MessageBody,
    devices: {
      deviceToken: string;
      _id: string;
    }[],
  ): Promise<void> {
    let messagesWithTokens = devices.map((deviceData) => {
      return {
        ...encodingDataForAllDevices(message),
        token: deviceData.deviceToken,
      };
    });

    const chunckLength = 300;
    let slicesNumber = Math.ceil(messagesWithTokens.length / chunckLength); ///SLICES NUMBER
    let promises = [];

    for (let i = 0; i < slicesNumber; i++) {
      let MessageList = messagesWithTokens.slice(
        i * chunckLength,
        (i + 1) * chunckLength,
      );
      console.log(MessageList.length);
      promises.push(admin.messaging().sendAll(MessageList));
    }
    console.log(promises);
    await Promise.all(promises);
    console.log('Done Package');
  }

  async sendTest(message: BaseMessageWithTokenTesting): Promise<void> {
    await admin.messaging().send(message);
  }

  async unSubscribe(user: UserDocument, token: string) {
    if (token) {
      const index = findKey(
        user.pushTokens,
        matchesProperty('deviceToken', token),
      );

      if (index !== undefined) {
        user.pushTokens.splice(parseInt(index), 1);
        return await user.save();
      }
    }
  }
  async subscribe(
    user: UserDocument,
    deviceType: DeviceType,
    token: string,
    oldToken?: string,
  ) {
    if (oldToken) {
      const index = findKey(
        user.pushTokens,
        matchesProperty('deviceToken', oldToken),
      );
      if (index !== undefined) {
        user.pushTokens.splice(parseInt(index), 1);
      }
    }

    if (token) {
      const index = findKey(
        user.pushTokens,
        matchesProperty('deviceToken', token),
      );
      if (index === undefined) {
        user.pushTokens.push({
          deviceType: deviceType,
          deviceToken: token,
        } as PushToken);
      }
    }

    return await user.save();
  }

  async fetchAll(user: UserDocument, queryParams: PaginationParams) {
    (queryParams as queryParamsWithId).targetUsers = user._id;

    const notifications =
      await this.NotificationRepositary.findAllWithPaginationOption(
        queryParams,
        ['targetUsers'],
        { sort: '-createdAt' /*  projection: { targetUsers: 0, readBy: 0 } */ },
      );

    await this.NotificationRepositary.updateAllVoid(
      { targetUsers: user._id },
      {
        $addToSet: { readBy: user._id } as any,
      },
    );
    return notifications;
  }

  async fetchCount(user: UserDocument): Promise<{ count: number }> {
    const count = await this.NotificationRepositary.countNotifications(user);
    return { count: count };
  }
}
