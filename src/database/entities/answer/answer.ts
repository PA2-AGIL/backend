import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';

export type AnswerType = Answer & Document;

@Schema()
export class Answer {
  @ApiProperty()
  @Prop({ required: true })
  content: string;

  @ApiProperty()
  @Prop({ required: true, type: Types.ObjectId })
  ownerId: string;

  @ApiProperty()
  @Prop({ required: true })
  questionId: string;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
