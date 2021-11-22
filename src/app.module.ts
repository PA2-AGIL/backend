import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProducerModule } from './presentation/producer/producer.module';
import { ExpertModule } from './presentation/expert/expert.module';
import { QuestionModule } from './presentation/question/question.module';
import { AnswerModule } from './presentation/answer/answer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRoot(),
    ProducerModule,
    ExpertModule,
    QuestionModule,
    AnswerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
