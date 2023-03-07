

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User {
  @Prop({ required: false })
  name: string;

  @Prop({unique:[true, 'Email already exists']})
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({unique:[true, 'Account number already exists']})
  accountNumber: number;

   @Prop({ default: 0 })
  accountBalance: number;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);


