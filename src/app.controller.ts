import { Controller, Get, HttpServer } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator';
import { catchError, firstValueFrom } from 'rxjs';
import { MessageQueueService } from './message-queue/message-queue.service';
import * as test from 'qiniu-js';
import * as test2 from 'multer-s3';
import * as test3 from 'multer-minio-storage';
import * as test4 from 'minimist';
import * as test5 from 'kafkajs';
import * as test6 from 'graphql';
import axios, { AxiosError } from 'axios';
import { HttpService } from '@nestjs/axios/dist';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService, // private readonly messageQueueService: MessageQueueService,
    private readonly httpService: HttpService,
  ) {}

  @Public()
  @Get('/hello')
  async getHello() {
    const req = await this.httpService.post(
      `http://${process.env.NOTIFICATION_SERVICE_SERVICE_HOST}/Notifications/send-many-docs`,
      { hello: ['ss', 'dd'], babay: '' },
    );
    req.forEach((value) => {
      console.log(value.data);
    });
    const req2 = await this.httpService.post(
      `http://${process.env.NOTIFICATION_SERVICE}/Notifications/send-many-docs`,
    );
    req2.forEach((value) => {
      console.log(value.data);
    });

    return 'done';
  }

  // @Public()
  // @Get('publisher')
  // async publish() {
  //   await this.messageQueueService.publishToChannel({
  //     routingKey: 'test1',
  //     exchangeName: '',
  //     data: 'q',
  //   });
  //   return 'OK';
  // }
}
