import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { UpdateExpertDTO } from 'src/database/repositories/dtos/updateExpertDTO.interface';

export class UpdateExpertDTOImp implements UpdateExpertDTO {
  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  password: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsPhoneNumber()
  @IsOptional()
  phone: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  address: string;
}
