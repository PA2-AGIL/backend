import { IsNotEmpty, IsString } from 'class-validator';
import { UpdateAnswerDTO } from '../../../database/repositories/dtos/updateAnswerDTO.interface';

export class UpdateAnswerDTOImp implements UpdateAnswerDTO {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  owner: string;
}
