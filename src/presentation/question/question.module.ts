import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionRepository } from 'src/database/repositories/question.repository';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionRepository])],
  providers: [QuestionService],
  controllers: [QuestionController],
})
export class QuestionModule {}
