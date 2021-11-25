import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionRepository } from 'src/database/repositories/question.repository';
import { AnswerRepository } from '../../database/repositories/answer.repository';
import { CreateAnswerDTOImp } from './dto/createAnswerDTO';
import { UpdateAnswerDTOImp } from './dto/updateAnswerDTO';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(AnswerRepository)
    private readonly repository: AnswerRepository,
    @InjectRepository(QuestionRepository)
    private readonly questionRepository: QuestionRepository,
  ) {}

  async getAnswers() {
    return this.repository.getAnswers();
  }

  async getByID(id: number) {
    return this.repository.getByID(id);
  }

  async create(createAnswerDTO: CreateAnswerDTOImp, questionId: number) {
    const question = await this.questionRepository.getByID(questionId);

    return this.repository.createAnswer(createAnswerDTO, question);
  }

  async update(id: number, updateAnswerDTO: UpdateAnswerDTOImp) {
    return this.repository.updateAnswer(id, updateAnswerDTO);
  }

  async delete(id: number) {
    return this.repository.deleteAnswer(id);
  }
}
