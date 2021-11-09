import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UpdateSpecialistDTO } from '../../../database/repositories/specialist/dtos/updateSpecialistDTO.interface';

export class UpdateSpecialistDTOImp implements UpdateSpecialistDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsString()
  @IsNotEmpty()
  type: string;
}
