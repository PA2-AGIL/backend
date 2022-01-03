import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateAnswerDTO } from '../../../database/repositories/dtos/createAnswerDTO.interface';

export class CreateAnswerDTOImp implements CreateAnswerDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;
}
