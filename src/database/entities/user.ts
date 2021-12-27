import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class User {
  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @ApiProperty()
  @Prop({ required: true, unique: true })
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
}
