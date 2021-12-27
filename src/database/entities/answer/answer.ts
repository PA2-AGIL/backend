import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { Question } from '../question/question';

export type AnswerType = Answer & Document;

@Schema()
export class Answer {
  @ApiProperty()
  @Prop({ required: true })
  content: string;

  @ApiProperty()
  @Prop({ required: true })
  ownerId: string;

  @ApiProperty()
  @Prop({ required: true })
  isExpert: boolean;

  @Prop({ required: true })
  question: Question;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
