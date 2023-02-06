import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface Names {
  nameAr: string;
  nameEn: string;
}
export interface Quantities {
  name: string;
  quantity: number;
}

export type BagDocument = Bag & Document;

@Schema({
  timestamps: true,
})
export class Bag {
  @Prop(
    raw({
      nameAr: { type: String, required: true },
      nameEn: { type: String, required: true },
    }),
  )
  names: Names;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
  })
  quantities: Quantities[];
}
const BagSchema = SchemaFactory.createForClass(Bag);

BagSchema.virtual('created').get(function (this: BagDocument) {
  return `${this.description} AND ${this.price}`;
});

BagSchema.pre('save', async function () {
  console.log('Saved');
});

export { BagSchema };
