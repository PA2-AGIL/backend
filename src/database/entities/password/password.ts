import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({
  _id: true,
  timestamps: { createdAt: true, updatedAt: true },
})
export class Password {
  @ApiProperty()
  _id: string;

  @Prop({ required: true })
  @ApiProperty()
  email: string;

  @Prop({ required: true })
  @ApiProperty()
  token: string;
}

export const PasswordSchema = SchemaFactory.createForClass(Password);
