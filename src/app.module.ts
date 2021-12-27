import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProducerModule } from './presentation/producer/producer.module';
import { ExpertModule } from './presentation/expert/expert.module';
import { QuestionModule } from './presentation/question/question.module';
import { AnswerModule } from './presentation/answer/answer.module';
import { FileUploadModule } from './service/file-upload/file-upload.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.env.NODE_ENV}.env`,
    }),
    MongooseModule.forRoot('mongodb://localhost/dev', {
      useFindAndModify: true,
    }),
    ProducerModule,
    ExpertModule,
    // QuestionModule,
    // AnswerModule,
    // FileUploadModule,
    // AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
