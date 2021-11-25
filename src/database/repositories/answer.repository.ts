import { EntityRepository, Repository } from 'typeorm';
import { Answer } from '../entities/answer/answer';
import { Question } from '../entities/question/question';
import { CreateAnswerDTO } from './dtos/createAnswerDTO.interface';
import { UpdateAnswerDTO } from './dtos/updateAnswerDTO.interface';

@EntityRepository(Answer)
export class AnswerRepository extends Repository<Answer> {
  async getAnswers() {
    const answers = await this.find();

    return answers;
  }

  async getByID(id: number) {
    const answer = await this.findOne({ id });

    if (!answer) {
      throw Error('Não foi possível encontrar essa resposta');
    }

    return answer;
  }

  async createAnswer(createAnswerDTO: CreateAnswerDTO, question: Question) {
    const { content, isExpert, ownerId } = createAnswerDTO;

    const answer = new Answer();

    answer.content = content;
    answer.ownerId = ownerId;
    answer.isExpert = isExpert;
    answer.question = question;

    await answer.save();

    return answer;
  }

  async updateAnswer(id: number, updateAnswerDTO: UpdateAnswerDTO) {
    const answer = await this.getByID(id);
    const { content, ownerId, isExpert } = updateAnswerDTO;

    answer.content = content;
    answer.ownerId = ownerId;
    answer.isExpert = isExpert;

    await answer.save();

    return answer;
  }

  async deleteAnswer(id: number) {
    return this.delete({ id });
  }
}
