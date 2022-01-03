import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Answer, AnswerSchema } from 'src/database/entities/answer/answer';
import {
  Question,
  QuestionSchema,
} from 'src/database/entities/question/question';
import { AnswerRepository } from 'src/database/repositories/answer.repository';
import { QuestionRepository } from 'src/database/repositories/question.repository';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Answer.name, schema: AnswerSchema },
      { name: Question.name, schema: QuestionSchema },
    ]),
  ],
  providers: [AnswerService, AnswerRepository, QuestionRepository],
  controllers: [AnswerController],
})
export class AnswerModule {}
