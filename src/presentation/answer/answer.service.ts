import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { QuestionRepository } from 'src/database/repositories/question.repository';
import { PaginationDTO } from 'src/utils/pagination/dto/paginationDTO';
import { Answer, Owner } from 'src/database/entities/answer/answer';
import { AnswerRepository } from '../../database/repositories/answer.repository';
import { CreateAnswerDTOImp } from './dto/createAnswerDTO';
import { UpdateAnswerDTOImp } from './dto/updateAnswerDTO';
import { User } from 'src/database/entities/user';
import { ExpertRespository } from 'src/database/repositories/expert.repository';
import { ProducerRepository } from 'src/database/repositories/producer.repository';
import { Document } from 'mongoose';
import { Producer } from 'src/database/entities/producer/producer';
import { Expert } from 'src/database/entities/expert/expert';

@Injectable()
export class AnswerService {
  private readonly logger = new Logger(AnswerService.name);

  constructor(
    private readonly repository: AnswerRepository,
    private readonly questionRepository: QuestionRepository,
    private readonly expertRepository: ExpertRespository,
    private readonly producerRepository: ProducerRepository,
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

  async likeAnswer(id: string, userId: string) {
    const expertFounded = await this.expertRepository.getById(userId);
    const producerFounded = await this.producerRepository.getByID(userId);
    const answerToLiked = await this.repository.getByID(id);

    if (expertFounded) {
      return await this.handleLikeAnswer(answerToLiked, expertFounded);
    }

    if (producerFounded) {
      return await this.handleLikeAnswer(answerToLiked, producerFounded);
    }
  }

  async dislikeAnswer(id: string, userId: string) {
    const expertFounded = await this.expertRepository.getById(userId);
    const producerFounded = await this.producerRepository.getByID(userId);
    const answerToDisliked = await this.repository.getByID(id);

    if (expertFounded) {
      return await this.handleDeslikeAnswer(answerToDisliked, expertFounded);
    }

    if (producerFounded) {
      return await this.handleDeslikeAnswer(answerToDisliked, producerFounded);
    }
  }

  private async handleLikeAnswer(
    answer: Answer & Document,
    user: (Expert & Document) | (Producer & Document),
  ) {
    const alreadyLikedAnswer = user.answersLiked.find(
      (a) => a._id.toString() === answer._id.toString(),
    );

    const dislikedAnswerToLikeIt = user.answersDisliked.find(
      (a) => a._id.toString() === answer._id.toString(),
    );

    if (alreadyLikedAnswer === undefined) {
      if (dislikedAnswerToLikeIt) {
        return await this.likeDislikedAnswer(answer._id.toString(), user);
      }
      return await this.likeNewAnswer(answer._id.toString(), user);
    } else if (dislikedAnswerToLikeIt) {
      return await this.likeDislikedAnswer(answer._id.toString(), user);
    } else {
      throw new BadRequestException(
        `O usuário ${user.name} já deu like nesta respsota`,
      );
    }
  }

  private async handleDeslikeAnswer(
    answer: Answer & Document,
    user: (Expert & Document) | (Producer & Document),
  ) {
    const alreadyDislikedAnswers = user.answersDisliked.find(
      (a) => a._id.toString() === answer._id.toString(),
    );

    const likedAnswerToDislikeIt = user.answersLiked.find(
      (a) => a._id.toString() === answer._id.toString(),
    );

    if (alreadyDislikedAnswers === undefined) {
      if (likedAnswerToDislikeIt) {
        return await this.dislikeLikedAnswer(
          likedAnswerToDislikeIt._id.toString(),
          user,
        );
      }
      return await this.dislikeNewAnswer(answer._id.toString(), user);
    } else if (likedAnswerToDislikeIt !== undefined) {
      return await this.dislikeLikedAnswer(
        likedAnswerToDislikeIt._id.toString(),
        user,
      );
    } else {
      throw new BadRequestException(
        `O usuário ${user.name} já deu dislike nesta questão`,
      );
    }
  }

  private async likeNewAnswer(
    id: string,
    user: (Expert & Document) | (Producer & Document),
  ) {
    const likedAnswer = await this.repository.likeAnswer(id);

    user.answersLiked.push(likedAnswer);

    await user.save();

    return likedAnswer;
  }

  private async dislikeNewAnswer(
    id: string,
    user: (Expert & Document) | (Producer & Document),
  ) {
    const dislikedAnswer = await this.repository.dislikeAnswer(id);

    user.answersDisliked.push(dislikedAnswer);

    await user.save();

    return dislikedAnswer;
  }

  private async likeDislikedAnswer(
    id: string,
    user: (Expert & Document) | (Producer & Document),
  ) {
    const removeAnswerDesliked = await this.repository.removeDislikedFromAnswer(
      id,
    );

    user.answersDisliked.splice(
      user.answersDisliked.indexOf(removeAnswerDesliked) + 1,
      1,
    );

    const answerLiked = await this.repository.likeAnswer(id);

    user.answersLiked.push(answerLiked);

    await user.save();

    return answerLiked;
  }

  private async dislikeLikedAnswer(
    id: string,
    user: (Expert & Document) | (Producer & Document),
  ) {
    const removeAnswerLiked = await this.repository.removeLikedFromAnswer(id);

    user.answersLiked.splice(
      user.answersLiked.indexOf(removeAnswerLiked) + 1,
      1,
    );

    const answerDisliked = await this.repository.dislikeAnswer(id);

    user.answersDisliked.push(answerDisliked);

    await user.save();

    return answerDisliked;
  }
}
