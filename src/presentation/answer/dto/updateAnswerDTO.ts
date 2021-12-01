import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { UpdateAnswerDTO } from '../../../database/repositories/dtos/updateAnswerDTO.interface';

export class UpdateAnswerDTOImp implements UpdateAnswerDTO {
  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsString()
  ownerId: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsBoolean()
  isExpert: boolean;
}
