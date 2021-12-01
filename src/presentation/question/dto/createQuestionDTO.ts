import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateQuestionDTO } from '../../../database/repositories/dtos/createQuestionDTO.interface';

export class CreateQuestionDTOImp implements CreateQuestionDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;
}
