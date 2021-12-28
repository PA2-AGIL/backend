import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationDTO } from 'src/utils/pagination/dto/paginationDTO';
import { Pagination } from 'src/utils/pagination/pagination';
import { Producer } from '../entities/producer/producer';
import { Question, QuestionType } from '../entities/question/question';
import { CreateQuestionDTO } from './dtos/createQuestionDTO.interface';
import { UpdateQuestionDTO } from './dtos/updateQuestionDTO.interface';

@Injectable()
export class QuestionRepository {
  constructor(
    @InjectModel(Question.name)
    private readonly model: Model<QuestionType>,
  ) {}

  async getQuestions(
    query: string,
    paginationDTO: PaginationDTO,
  ): Promise<Pagination<Question[]>> {
    const { limit, page } = paginationDTO;

    const skippedItems = (page - 1) * limit;

    if (query) {
      const result = await this.model
        .find({
          $or: [{ content: { $in: [query] } }, { title: { $in: [query] } }],
        })
        .populate('producer')
        .limit(limit)
        .skip(skippedItems)
        .sort({
          title: 'asc',
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
        .populate('producer')
        .limit(limit)
        .skip(skippedItems)
        .sort({ title: 'asc' });

      return {
        data: result,
        limit,
        page,
        totalCount: result.length,
      };
    }
  }

  async getByID(id: string) {
    const question = await this.model.findById(id);

    if (!question) {
      throw Error('Não foi possível encontrar essa questão');
    }

    return question;
  }

  async createQuestion(
    createQuestionDTO: CreateQuestionDTO,
    images: string[],
    producer: Producer,
  ) {
    const { title, content } = createQuestionDTO;

    const question = await this.model.create({
      title,
      content,
      images,
      producer,
    });

    await question.save();

    return question;
  }

  async updateQuestion(id: string, updateQuestionDTO: UpdateQuestionDTO) {
    const question = await this.getByID(id);
    const { title, closed, content } = updateQuestionDTO;

    question.content = content;
    question.title = title;
    question.closed = closed;

    await question.save();

    return question;
  }

  async deleteQuestion(id: string) {
    return this.model.findByIdAndDelete({ id });
  }
}
