import { Module } from '@nestjs/common';
import { BagsService } from './bags.service';
import { BagsController } from './bags.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Bag, BagSchema } from './models/bag.model';
import { BagRepository } from './bags.repository';
import { MessageQueueModule } from 'src/message-queue/message-queue.module';

@Module({
  controllers: [BagsController],
  providers: [BagsService, BagRepository],
  imports: [
    MongooseModule.forFeature([
      {
        name: Bag.name,
        schema: BagSchema,
      },
    ]),
    MessageQueueModule,
  ],
})
export class BagsModule {}
