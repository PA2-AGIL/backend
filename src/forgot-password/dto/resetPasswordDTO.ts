import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ResetPasswordDTO } from 'src/database/repositories/dtos/resetPasswordDTO.interface';

export class ResetPasswordDTOImp implements ResetPasswordDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  token: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  passwordConfirm: string;
}
