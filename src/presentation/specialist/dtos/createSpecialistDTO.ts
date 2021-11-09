import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { CreateSpecialistDTO } from '../../../database/repositories/specialist/dtos/createSpecialistDTO.interface';

export class CreateSpecialistImp implements CreateSpecialistDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  type: string;
}
