import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionRepository } from 'src/database/repositories/question.repository';
import { CreateQuestionDTOImp } from './dto/createQuestionDTO';
import { UpdateQuestionDTOImp } from './dto/updateQuestionDTOImp';
import { ProducerRepository } from 'src/database/repositories/producer.repository';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionRepository)
    private readonly repository: QuestionRepository,
    @InjectRepository(ProducerRepository)
    private readonly producerRepository: ProducerRepository,
  ) {}

  async getQuestions() {
    return this.repository.getQuestions();
  }

  async getByID(id: number) {
    return this.repository.getByID(id);
  }

  async create(createQuestion: CreateQuestionDTOImp, ownerId: number) {
    const owner = await this.producerRepository.getByID(ownerId);

    return this.repository.createQuestion(createQuestion, owner);
  }

  async update(id: number, updateQuestion: UpdateQuestionDTOImp) {
    return this.repository.updateQuestion(id, updateQuestion);
  }

  async delete(id: number) {
    return this.repository.deleteQuestion(id);
  }
}
