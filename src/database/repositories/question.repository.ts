import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

  async getQuestions(query: string) {
    if (query) {
      return await this.model.find({ name: { $in: [query] } });

      // return await this.find({
      //   where: [
      //     { title: ILike(`%${query}%`) },
      //     { content: ILike(`%${query}%`) },
      //   ],
      // });
    } else {
      return await this.model.find();
    }
  }

  async getByID(id: string) {
    const question = await this.model.findOne({ id });

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
