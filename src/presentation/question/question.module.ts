import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { QuestionRepository } from '../../database/repositories/question.repository';
import { ProducerRepository } from '../../database/repositories/producer.repository';
import { FileUploadModule } from 'src/service/file-upload/file-upload.module';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Question,
  QuestionSchema,
} from 'src/database/entities/question/question';
import {
  Producer,
  ProducerSchema,
} from 'src/database/entities/producer/producer';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Question.name, schema: QuestionSchema },
      { name: Producer.name, schema: ProducerSchema },
    ]),
    FileUploadModule,
  ],
  providers: [QuestionService, QuestionRepository, ProducerRepository],
  controllers: [QuestionController],
})
export class QuestionModule {}
