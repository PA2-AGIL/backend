import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { expertRespository } from 'src/database/repositories/expert.repository';
import { FileUploadModule } from 'src/service/file-upload/file-upload.module';
import { ExpertController } from './expert.controller';
import { ExpertService } from './expert.service';

@Module({
  imports: [TypeOrmModule.forFeature([expertRespository]), FileUploadModule],
  controllers: [ExpertController],
  providers: [ExpertService],
})
export class ExpertModule {}
