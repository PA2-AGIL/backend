import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UpdateProducerDTO } from '../../../database/repositories/dtos/updateProducerDTO.interface';

export class UpdateProducerDTOImp implements UpdateProducerDTO {
  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsString()
  address: string;
}
