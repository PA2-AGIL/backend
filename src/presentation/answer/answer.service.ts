import { Injectable } from '@nestjs/common';
import { QuestionRepository } from 'src/database/repositories/question.repository';
import { PaginationDTO } from 'src/utils/pagination/dto/paginationDTO';
import { AnswerRepository } from '../../database/repositories/answer.repository';
import { CreateAnswerDTOImp } from './dto/createAnswerDTO';
import { UpdateAnswerDTOImp } from './dto/updateAnswerDTO';

@Injectable()
export class AnswerService {
  constructor(
    private readonly repository: AnswerRepository,
    private readonly questionRepository: QuestionRepository,
  ) {}

  async getAnswers(query: string, paginationDTO: PaginationDTO) {
    return this.repository.getAnswers(query, paginationDTO);
  }

  async getByID(id: string) {
    return this.repository.getByID(id);
  }

  async create(
    createAnswerDTO: CreateAnswerDTOImp,
    questionId: string,
    ownerId: string,
  ) {
    const question = await this.questionRepository.getByID(questionId);

    return this.repository.createAnswer(createAnswerDTO, question, ownerId);
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
