import { IsString } from 'class-validator';
import { CreateFileDTO } from 'src/database/repositories/dtos/createFileDTO.interface';

export class CreateFileDTOImp implements CreateFileDTO {
  @IsString()
  fileName: string;

  @IsString()
  url: string;
}
