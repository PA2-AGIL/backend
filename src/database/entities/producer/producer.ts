import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Question } from '../question/question';
import { User } from '../user';

export type ProducerType = Producer & Document;

@Schema()
export class Producer extends User {
  questions: Question[];
}

export const ProducerSchema = SchemaFactory.createForClass(Producer);
