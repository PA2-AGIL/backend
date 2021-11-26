import { EntityRepository, Repository } from 'typeorm';
import { File } from '../entities/file/file';
import { Producer } from '../entities/producer/producer';
import { Question } from '../entities/question/question';
import { CreateQuestionDTO } from './dtos/createQuestionDTO.interface';
import { UpdateQuestionDTO } from './dtos/updateQuestionDTO.interface';

@EntityRepository(Question)
export class QuestionRepository extends Repository<Question> {
  async getQuestions() {
    const questions = await this.find();

    return questions;
  }

  async getByID(id: number) {
    const question = await this.findOne({ id });

    if (!question) {
      throw Error('Não foi possível encontrar essa questão');
    }

    return question;
  }

  async createQuestion(
    createQuestionDTO: CreateQuestionDTO,
    files: File[],
    producer: Producer,
  ) {
    const { title, content } = createQuestionDTO;

    const question = new Question();

    question.title = title;
    question.content = content;
    question.files = files;
    question.producer = producer;

    await question.save();

    return question;
  }

  async updateQuestion(id: number, updateQuestionDTO: UpdateQuestionDTO) {
    const question = await this.getByID(id);
    const { title, closed, content } = updateQuestionDTO;

    question.content = content;
    question.title = title;
    question.closed = closed;

    await question.save();

    return question;
  }

  async deleteQuestion(id: number) {
    return this.delete({ id });
  }
}
