import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionRepository } from 'src/database/repositories/question.repository';
import { CreateQuestionDTOImp } from './dto/createQuestionDTO';
import { UpdateQuestionDTOImp } from './dto/updateQuestionDTOImp';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionRepository)
    private readonly repository: QuestionRepository,
  ) {}

  async getQuestions() {
    return this.repository.getQuestions();
  }

  async getByID(id: number) {
    return this.repository.getByID(id);
  }

  async create(createQuestion: CreateQuestionDTOImp) {
    return this.repository.createQuestion(createQuestion);
  }

  async update(id: number, updateQuestion: UpdateQuestionDTOImp) {
    return this.repository.updateQuestion(id, updateQuestion);
  }

  async delete(id: number) {
    return this.repository.deleteQuestion(id);
  }
}
