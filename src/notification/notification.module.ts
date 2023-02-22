import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from 'src/database.module';
import { UsersModule } from 'src/users/users.module';
import { Notification, NotificationSchema } from './notification.model';
import { NotificationService } from './notification.service';
import { NotificationController } from './notifications.controller';
import { NotificationRepository } from './notifications.repository';

@Module({
  exports: [NotificationService, NotificationRepository],
  providers: [NotificationService, NotificationRepository],
  imports: [
    MongooseModule.forFeature([
      {
        name: Notification.name,
        schema: NotificationSchema,
      },
    ]),
    ConfigModule,
    DatabaseModule,
    forwardRef(() => UsersModule),
   
  ],
  controllers: [NotificationController],
})
export class NotificationModule {}
