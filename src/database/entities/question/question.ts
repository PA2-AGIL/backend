import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';
import { Answer } from '../answer/answer';
import { Producer } from '../producer/producer';

export type QuestionType = Question & Document;
@Schema({
  _id: true,
  timestamps: { createdAt: true, updatedAt: true },
})
export class Question {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop({ required: true })
  title: string;

  @ApiProperty()
  @Prop({ required: true })
  content: string;

  @ApiProperty()
  @Prop({ required: true, default: false })
  closed: boolean;

  @Prop({ type: Types.ObjectId, ref: 'Producer' })
  producer: Producer;

  @Prop({ required: false, type: [{ type: Types.ObjectId, ref: 'Answer' }] })
  answers: Answer[];

  @Prop({ required: false })
  images: string[];

  @Prop({ required: true, default: 0 })
  likes: number;

  @Prop({ required: true, default: 0 })
  dislike: number;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
