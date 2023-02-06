import { Injectable } from '@nestjs/common';
import { PaginateResult } from 'mongoose';
import { MessageQueueService } from 'src/message-queue/message-queue.service';
import { Constants } from 'src/utils/constants';
import { BagRepository } from './bags.repository';
import { CreateBagDto } from './dto/create-bag.dto';
import { FilterQueryOptionsBag } from './dto/filter-bags.dto';
import { UpdateBagDto } from './dto/update-bag.dto';
import { BagDocument } from './models/bag.model';

@Injectable()
export class BagsService {
  constructor(
    private readonly BagRepository: BagRepository,
    private readonly MessageQueueService: MessageQueueService,
  ) {}
  async create(createBagDto: CreateBagDto) {
    this.MessageQueueService.publishToChannel({
      data: 'HELLo' + createBagDto.description,
      exchangeName: '',
      routingKey: Constants.MessageQueues.TEST,
    });
    return await this.BagRepository.create(createBagDto);
  }

  async findAll(
    FilterQueryOptionsBag: FilterQueryOptionsBag,
  ): Promise<PaginateResult<BagDocument> | BagDocument[]> {
    return await this.BagRepository.findAllWithPaginationOption(
      FilterQueryOptionsBag,
      ['description'],
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} bag`;
  }

  update(id: number, updateBagDto: UpdateBagDto) {
    return `This action updates a #${id} bag`;
  }

  remove(id: number) {
    return `This action removes a #${id} bag`;
  }
}
