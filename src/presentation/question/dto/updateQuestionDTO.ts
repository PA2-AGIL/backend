import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { UpdateQuestionDTO } from '../../../database/repositories/dtos/updateQuestionDTO.interface';

export class UpdateQuestionDTOImp implements UpdateQuestionDTO {
  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsBoolean()
  closed: boolean;
}
