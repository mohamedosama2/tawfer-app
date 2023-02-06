import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/models/_user.model';

export type CategoryDocument = Category & Document;
@Schema({ timestamps: true })
export class Category {
  @Prop({ tyoe: String, required: true })
  name: string;

  @Prop({ tyoe: String, required: true })
  describtion: string;

  @Prop({
    default:
      'http://www.gebo.gov.eg/content/images/thumbs/default-image_415.png',
  })
  photo?: string;

  @Prop({
    type: [Types.ObjectId],
    ref: User.name,
    default: [],
  })
  fans?: Array<string>;
}

const CategorySchema = SchemaFactory.createForClass(Category);
export { CategorySchema };
