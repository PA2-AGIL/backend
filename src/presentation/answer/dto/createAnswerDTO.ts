import { IsNotEmpty, IsString } from 'class-validator';
import { CreateAnswerDTO } from '../../../database/repositories/dtos/createAnswerDTO.interface';

export class CreateAnswerDTOImp implements CreateAnswerDTO {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  owner: string;
}
