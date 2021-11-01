import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UpdateProducerDTO } from 'src/database/repositories/dtos/updateProducerDTO.interface';

export class UpdateProducerDTOImp implements UpdateProducerDTO {
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
