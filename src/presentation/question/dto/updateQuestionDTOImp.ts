import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { UpdateQuestionDTO } from '../../../database/repositories/dtos/updateQuestionDTO.interface';

export class UpdateQuestionDTOImp implements UpdateQuestionDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsBoolean()
  closed: boolean;
}
