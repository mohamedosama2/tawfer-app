import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { UnprocessableEntityException } from '@nestjs/common';
import { Constants } from '../../utils/constants';
import { Password } from '../../auth/utils/Password';

export type UserDocument = User & Document;

export enum UserRole {
  ADMIN = 'admin',
  STUDENT = 'student',
  TEACHER = 'teacher',
}

@Schema({
  discriminatorKey: 'role',
  timestamps: true,
  toJSON: {
    getters: true,
    virtuals: true,
    transform: (_, doc: Record<string, unknown>) => {
      delete doc.__v;
      delete doc._id;
      delete doc.password;
      return {
        ...doc,
      };
    },
  },
})
export class User {
  _id: string;

  @Prop({
    index: true,
    unique: true,
    sparse: true,
    match: Constants.EMAIL_REGX,
  })
  email: string;

  @Prop({
    index: true,
    unique: true,
    sparse: true,
    match: Constants.PHONE_REGX,
  })
  phone: string;

  @Prop({
    get: (username: string) => {
      return username.toUpperCase();
    },
    set: (username: string) => {
      return username.trim();
    },
    required: true,
  })
  username: string;

  @Prop()
  password: string;

  @Prop({ default: true })
  enabled: boolean;

  @Prop()
  photo: string;

  @Prop({ index: true, unique: true, sparse: true })
  facebookId: string;

  @Prop({ index: true, unique: true, sparse: true })
  googleId: string;

  @Prop({ required: true, type: String, enum: Object.values(UserRole) })
  role: UserRole;

  /*  */
}

const UserSchema = SchemaFactory.createForClass(User);

// UserSchema.virtual('NameAndEmail').get(function (this: UserDocument) {
//   return `${this.email} + ${this.username}`;
// });

UserSchema.pre('save', async function () {
  const user = this;

  const nullableFields: Array<string> = [
    'phone',
    'email',
    'googleId',
    'facebookId',
  ];
  for (let i = 0; i < nullableFields.length; i++) {
    if (user.isModified(nullableFields[i])) {
      const value = user[nullableFields[i]];
      if (value === '' || value === null) user[nullableFields[i]] = undefined;
    }
  }

  const uniqueFields = ['phone', 'apple_id', 'fb_id', 'email'];
  for (let i = 0; i < uniqueFields.length; i++) {
    if (user.isModified(uniqueFields[i])) {
      // be true if was undefined then set value to it , be false if same value set to it
      const value = user[uniqueFields[i]];
      if (value === undefined) continue;
      const filter = {};
      filter[uniqueFields[i]] = value;
      const model = <Model<User>>this.constructor;
      const count = await model.countDocuments(filter);
      if (count) {
        throw new UnprocessableEntityException(
          `${uniqueFields[i]} : ${value} is not a uniqu value`,
        );
      }
    }
  }
  if ((this as UserDocument).password && this.isModified('password')) {
    // (this as UserDocument).password = await hash(
    //   (this as UserDocument).password,
    //   10,
    // );
    (this as UserDocument).password = await Password.hash(
      (this as UserDocument).password,
    );
  }
});

UserSchema.methods.isValidPassword = async function (password) {
  // return compare(password, (this as UserDocument).password);
  return Password.isCorrectPassword(password, (this as UserDocument).password);
};

export { UserSchema };
