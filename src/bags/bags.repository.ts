import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseAbstractRepository } from 'src/utils/base.abstract.repository';
import { Bag, BagDocument } from './models/bag.model';

@Injectable()
export class BagRepository extends BaseAbstractRepository<Bag> {
  constructor(@InjectModel(Bag.name) private bagModel: Model<BagDocument>) {
    super(bagModel);
  }
}
