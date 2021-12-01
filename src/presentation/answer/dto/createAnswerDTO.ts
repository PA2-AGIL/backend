import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { CreateAnswerDTO } from '../../../database/repositories/dtos/createAnswerDTO.interface';

export class CreateAnswerDTOImp implements CreateAnswerDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  ownerId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isExpert: boolean;
}
