import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  gender: string;

  @Prop()
  address: string;

  @Prop()
  Phone: string;

  @Prop({type: Object})
  company: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };

  @Prop()
  Role: string;

  @Prop()
  RefreshToken: string;

  @Prop({type: Object})
  createdBy: {
      _id: mongoose.Schema.Types.ObjectId;
      email: string;
  };

  @Prop({type: Object})
  updatedBy: {
      _id: mongoose.Schema.Types.ObjectId;
      email: string;
  };

  @Prop({type: Object})
  deletedBy: {
      _id: mongoose.Schema.Types.ObjectId;
      email: string;
  };

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  isDeleted: boolean;

  @Prop()
  deleteAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
