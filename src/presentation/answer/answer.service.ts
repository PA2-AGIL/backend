import { Injectable } from '@nestjs/common';
import { QuestionRepository } from 'src/database/repositories/question.repository';
import { AnswerRepository } from '../../database/repositories/answer.repository';
import { CreateAnswerDTOImp } from './dto/createAnswerDTO';
import { UpdateAnswerDTOImp } from './dto/updateAnswerDTO';

@Injectable()
export class AnswerService {
  constructor(
    private readonly repository: AnswerRepository,
    private readonly questionRepository: QuestionRepository,
  ) {}

  async getAnswers(query: string) {
    return this.repository.getAnswers(query);
  }

  async getByID(id: string) {
    return this.repository.getByID(id);
  }

  async create(createAnswerDTO: CreateAnswerDTOImp, questionId: string) {
    const question = await this.questionRepository.getByID(questionId);

    return this.repository.createAnswer(createAnswerDTO, question);
  }

  async update(id: string, updateAnswerDTO: UpdateAnswerDTOImp) {
    return this.repository.updateAnswer(id, updateAnswerDTO);
  }

  async delete(id: string) {
    return this.repository.deleteAnswer(id);
  }

  // async paginate(ops: IPaginationOptions) {
  //   return await paginate<Answer>(this.repository, ops);
  // }
}
