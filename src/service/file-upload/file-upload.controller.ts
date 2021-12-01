import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { FileUploadService } from './file-upload.service';

@Controller('fileupload')
@ApiTags('fileupload')
export class FileUploadController {
  constructor(private readonly service: FileUploadService) {}
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file: Express.Multer.File) {
    return this.service.upload(file.buffer, file.originalname);
  }
}
