import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionRepository } from '../../database/repositories/question.repository';
import { ProducerRepository } from '../../database/repositories/producer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionRepository, ProducerRepository])],
  providers: [QuestionService],
  controllers: [QuestionController],
})
export class QuestionModule {}
