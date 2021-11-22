import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerRepository } from 'src/database/repositories/answer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AnswerRepository])],
  providers: [AnswerService],
  controllers: [AnswerController],
})
export class AnswerModule {}
