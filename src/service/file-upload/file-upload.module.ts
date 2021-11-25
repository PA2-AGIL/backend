import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileRepository } from 'src/database/repositories/file.repository';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([FileRepository])],
  controllers: [FileUploadController],
  providers: [FileUploadService],
})
export class FileUploadModule {}
