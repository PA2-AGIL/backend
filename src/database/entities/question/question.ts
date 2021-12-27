import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { Answer } from '../answer/answer';
import { Producer } from '../producer/producer';

export type QuestionType = Question & Document;
@Schema()
export class Question {
  @ApiProperty()
  @Prop({ required: true })
  title: string;

  @ApiProperty()
  @Prop({ required: true })
  content: string;

  @ApiProperty()
  @Prop({ required: true, default: false })
  closed: boolean;

  @Prop({ required: true })
  producer: Producer;

  @Prop({ required: true })
  answers: Answer[];

  @Prop({ required: true })
  images: string[];
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
