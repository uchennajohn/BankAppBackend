import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, enum: ['deposit', 'withdrawal'] })
  type: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: false })
  depositorName: string;

  @Prop({ required: false })
  accountName: string;

  @Prop({ default: Date.now })
  date: Date;
}


export const TransactionSchema = SchemaFactory.createForClass(Transaction);
