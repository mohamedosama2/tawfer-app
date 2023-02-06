import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Category } from 'src/categories/models/category.model';
import { User } from 'src/users/models/_user.model';

export type FoodDocument = Food & Document;

@Schema({
  timestamps: true,
})
export class Food {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ tyoe: String, required: true })
  address: string;

  @Prop({ tyoe: String })
  describtion?: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Types.ObjectId, ref: Category.name, required: true })
  category: string;

  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: true,
  })
  customer: string;

  @Prop({
    default:
      'http://www.gebo.gov.eg/content/images/thumbs/default-image_415.png',
  })
  photo?: string;
}

const FoodSchema = SchemaFactory.createForClass(Food);
export { FoodSchema };
