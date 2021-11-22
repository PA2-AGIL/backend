import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerRepository } from '../../database/repositories/answer.repository';
import { CreateAnswerDTOImp } from './dto/createAnswerDTO';
import { UpdateAnswerDTOImp } from './dto/updateAnswerDTO';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(AnswerRepository)
    private readonly repository: AnswerRepository,
  ) {}

  async getAnswers() {
    return this.repository.getAnswers();
  }

  async getByID(id: number) {
    return this.repository.getByID(id);
  }

  async create(createAnswerDTO: CreateAnswerDTOImp) {
    return this.repository.createAnswer(createAnswerDTO);
  }

  async update(id: number, updateAnswerDTO: UpdateAnswerDTOImp) {
    return this.repository.updateAnswer(id, updateAnswerDTO);
  }

  async delete(id: number) {
    return this.repository.deleteAnswer(id);
  }
}
