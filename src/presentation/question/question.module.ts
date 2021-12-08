import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionRepository } from '../../database/repositories/question.repository';
import { ProducerRepository } from '../../database/repositories/producer.repository';
import { FileUploadModule } from 'src/service/file-upload/file-upload.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([QuestionRepository, ProducerRepository]),
    FileUploadModule,
  ],
  providers: [QuestionService],
  controllers: [QuestionController],
})
export class QuestionModule {}
