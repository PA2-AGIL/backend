import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { CreateProducerDTO } from 'src/database/repositories/dtos/createProducerDTO.interface';

export class CreateProducerDTOImp implements CreateProducerDTO {
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
  phone: string;

  @IsNotEmpty()
  @IsString()
  address: string;
}
