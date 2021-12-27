import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Answer, AnswerType } from '../entities/answer/answer';
import { Question } from '../entities/question/question';
import { CreateAnswerDTO } from './dtos/createAnswerDTO.interface';
import { UpdateAnswerDTO } from './dtos/updateAnswerDTO.interface';

@Injectable()
export class AnswerRepository {
  constructor(
    @InjectModel(Answer.name)
    private readonly model: Model<AnswerType>,
  ) {}

  async getAnswers(query: string) {
    if (query) {
      return await this.model.find({ name: { $in: [query] } });

      // return await this.find({
      //   where: { content: Like(`%${query}%`) },
      // });
    } else {
      return await this.model.find();
    }
  }

  async getByID(id: string) {
    const answer = await this.model.findOne({ id });

    if (!answer) {
      throw Error('Não foi possível encontrar essa resposta');
    }

    return answer;
  }

  async createAnswer(createAnswerDTO: CreateAnswerDTO, question: Question) {
    const { content, isExpert, ownerId } = createAnswerDTO;

    const answer = await this.model.create({});

    answer.content = content;
    answer.ownerId = ownerId;
    answer.isExpert = isExpert;
    answer.question = question;

    await answer.save();

    return answer;
  }

  async updateAnswer(id: string, updateAnswerDTO: UpdateAnswerDTO) {
    const answer = await this.getByID(id);
    const { content, ownerId, isExpert } = updateAnswerDTO;

    answer.content = content;
    answer.ownerId = ownerId;
    answer.isExpert = isExpert;

    await answer.save();

    return answer;
  }

  async deleteAnswer(id: string) {
    return this.model.findByIdAndDelete({ id });
  }
}
