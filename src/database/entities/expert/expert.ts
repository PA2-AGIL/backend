import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { User } from '../user';

export type ExpertType = Expert & Document;
export class Expert extends User {
  @ApiProperty()
  @Prop()
  type: string;
}

export const ExpertSchema = SchemaFactory.createForClass(Expert);
