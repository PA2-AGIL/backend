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
import {
  Producer,
  ProducerSchema,
} from 'src/database/entities/producer/producer';
import { Expert, ExpertSchema } from 'src/database/entities/expert/expert';
import { ProducerRepository } from 'src/database/repositories/producer.repository';
import { ExpertRespository } from 'src/database/repositories/expert.repository';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Answer.name, schema: AnswerSchema },
      { name: Question.name, schema: QuestionSchema },
      { name: Producer.name, schema: ProducerSchema },
      { name: Expert.name, schema: ExpertSchema },
    ]),
  ],
  providers: [
    AnswerService,
    AnswerRepository,
    QuestionRepository,
    ProducerRepository,
    ExpertRespository,
  ],
  controllers: [AnswerController],
})
export class AnswerModule {}
