import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';
import { Question } from '../question/question';

export type AnswerType = Answer & Document;

export class Owner {
  name: string;
  _id: string;
  hasExpert: boolean;
}
@Schema({
  _id: true,
  timestamps: { createdAt: true, updatedAt: true },
})
export class Answer {
  @ApiProperty()
  @Prop({ required: true })
  content: string;

  @ApiProperty()
  @Prop({ required: true, type: Types.ObjectId })
  owner: Owner;

  @ApiProperty()
  @Prop({ required: true, type: Types.ObjectId, ref: 'Question' })
  question: Question;

  @Prop({ required: true, default: 0 })
  likes: number;

  @Prop({ required: true, default: 0 })
  dislike: number;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
