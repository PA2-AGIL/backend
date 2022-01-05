import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationDTO } from 'src/utils/pagination/dto/paginationDTO';
import { Pagination } from 'src/utils/pagination/pagination';
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

  async getAnswers(
    query: string,
    paginationDTO: PaginationDTO,
  ): Promise<Pagination<Answer[]>> {
    const { limit, page } = paginationDTO;

    const skippedItems = (page - 1) * limit;

    if (query) {
      const result = await this.model
        .find({
          $or: [{ content: { $in: [query] } }],
        })
        .limit(limit)
        .skip(skippedItems)
        .sort({
          content: 'asc',
        });

      return {
        data: result,
        limit,
        page,
        totalCount: result.length,
      };
    } else {
      const result = await this.model
        .find()
        .limit(limit)
        .skip(skippedItems)
        .sort({
          content: 'asc',
        });

      return {
        data: result,
        limit,
        page,
        totalCount: result.length,
      };
    }
  }

  async getByID(id: string) {
    const answer = await this.model.findOne({ id });

    if (!answer) {
      throw Error('Não foi possível encontrar essa resposta');
    }

    return answer;
  }

  async createAnswer(
    createAnswerDTO: CreateAnswerDTO,
    question: Question,
    ownerId: string,
  ) {
    const { content } = createAnswerDTO;

    const answer = await this.model.create({
      content,
      ownerId,
      question,
    });

    await answer.save();

    return answer;
  }

  async updateAnswer(id: string, updateAnswerDTO: UpdateAnswerDTO) {
    const answer = await this.getByID(id);
    const { content } = updateAnswerDTO;

    answer.content = content;

    await answer.save();

    return answer;
  }

  async deleteAnswer(id: string) {
    return this.model.findByIdAndDelete({ id });
  }
}
