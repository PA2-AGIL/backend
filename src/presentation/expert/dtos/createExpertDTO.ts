import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { CreateProducerDTO } from 'src/database/repositories/dtos/createProducerDTO.interface';

export class CreateExpertDTOImp implements CreateProducerDTO {
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
  @IsPhoneNumber()
  phone: string;

  @IsNotEmpty()
  @IsString()
  address: string;
}
