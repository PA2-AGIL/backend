import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Question } from '../question/question';
import { User } from '../user';

export type ProducerType = Producer & Document;

@Schema({
  _id: true,
  timestamps: { createdAt: true, updatedAt: true },
})
export class Producer extends User {
  @Prop({ required: false, type: [{ type: Types.ObjectId, ref: 'Question' }] })
  questions: Question[];
}

export const ProducerSchema = SchemaFactory.createForClass(Producer);
