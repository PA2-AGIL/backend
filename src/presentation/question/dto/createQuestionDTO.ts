import { IsNotEmpty, IsString } from 'class-validator';
import { CreateQuestionDTO } from '../../../database/repositories/dtos/createQuestionDTO.interface';

export class CreateQuestionDTOImp implements CreateQuestionDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
