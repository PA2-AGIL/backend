import { Injectable } from '@nestjs/common';
import { QuestionRepository } from 'src/database/repositories/question.repository';
import { PaginationDTO } from 'src/utils/pagination/dto/paginationDTO';
import { Owner } from 'src/database/entities/answer/answer';
import { AnswerRepository } from '../../database/repositories/answer.repository';
import { CreateAnswerDTOImp } from './dto/createAnswerDTO';
import { UpdateAnswerDTOImp } from './dto/updateAnswerDTO';
import { User } from 'src/database/entities/user';

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
    owner: User,
  ) {
    try {
      const ownerOfAnswer = new Owner();

      ownerOfAnswer.name = owner.name;
      ownerOfAnswer.hasExpert = owner?.type !== undefined ? true : false;
      ownerOfAnswer._id = owner._id.toString();

      const question = await this.questionRepository.getByID(questionId);

      const createdAnswer = await this.repository.createAnswer(
        createAnswerDTO,
        question,
        ownerOfAnswer,
      );

      question.answers.push(createdAnswer);

      await question.save();

      return;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: string, updateAnswerDTO: UpdateAnswerDTOImp) {
    return this.repository.updateAnswer(id, updateAnswerDTO);
  }

  async delete(id: string) {
    return this.repository.deleteAnswer(id);
  }
}
