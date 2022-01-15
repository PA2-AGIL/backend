import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ForgotPasswordDTO } from 'src/database/repositories/dtos/forgotPasswordDTO.interface';

export class ForgotPasswordDTOImp implements ForgotPasswordDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  token: string;
}
