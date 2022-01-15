import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { Answer } from './answer/answer';
import { Question } from './question/question';

export class User {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @ApiProperty()
  @Prop({ required: true })
  email: string;

  @ApiProperty()
  @Prop({ required: true })
  password: string;

  @ApiProperty()
  @Prop({ required: true })
  phone: string;

  @ApiProperty()
  @Prop({ required: true })
  address: string;

  @ApiProperty()
  @Prop({ required: false })
  profilePicture: string;

  @Prop({ required: true })
  salt: string;

  @Prop({
    required: false,
    type: [{ type: Types.ObjectId, ref: 'Question' }],
    unique: true,
  })
  questionsLiked: Question[];

  @Prop({
    required: false,
    type: [{ type: Types.ObjectId, ref: 'Question' }],
    unique: true,
  })
  questionsDisliked: Question[];

  @Prop({
    required: false,
    type: [{ type: Types.ObjectId, ref: 'Answer' }],
    unique: true,
  })
  answersLiked: Answer[];

  @Prop({
    required: false,
    type: [{ type: Types.ObjectId, ref: 'Answer' }],
    unique: true,
  })
  answersDisliked: Answer[];

  type: any;
}
