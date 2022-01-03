import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { User } from '../user';

export type ExpertType = Expert & Document;
@Schema({
  _id: true,
})
export class Expert extends User {
  @ApiProperty()
  @Prop({ required: true })
  type: string;
}

export const ExpertSchema = SchemaFactory.createForClass(Expert);
