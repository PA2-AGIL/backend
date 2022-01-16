import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationDTO } from 'src/utils/pagination/dto/paginationDTO';
import { Pagination } from 'src/utils/pagination/pagination';
import { Answer, AnswerType, Owner } from '../entities/answer/answer';
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

  async getAnswer(id: string) {
    const answer = await this.model.findById(id).populate('ownerId');

    if (!answer) {
      throw new BadRequestException('Não foi possível encontrar essa resposta');
    }

    return answer;
  }

  async getByID(id: string) {
    const answer = await this.model.findById(id);

    if (!answer) {
      throw new BadRequestException('Não foi possível encontrar essa resposta');
    }

    return answer;
  }

  async createAnswer(
    createAnswerDTO: CreateAnswerDTO,
    question: Question,
    owner: Owner,
  ) {
    const { content } = createAnswerDTO;

    const answer = await this.model.create({
      content,
      owner,
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

  async likeAnswer(id: string) {
    const answerLiked = await this.model.findByIdAndUpdate(id, {
      $inc: {
        likes: +1,
      },
    });

    return answerLiked;
  }

  async removeLikedFromAnswer(id: string) {
    const likedAnswerToDislikeIt = await this.model.findByIdAndUpdate(id, {
      $inc: {
        likes: -1,
      },
    });

    return likedAnswerToDislikeIt;
  }

  async dislikeAnswer(id: string) {
    const answerToDisliked = await this.model.findByIdAndUpdate(id, {
      $inc: {
        dislike: +1,
      },
    });

    return answerToDisliked;
  }

  async removeDislikedFromAnswer(id: string) {
    const dislikeAnswerToLikeIt = await this.model.findByIdAndUpdate(id, {
      $inc: {
        dislike: -1,
      },
    });

    return dislikeAnswerToLikeIt;
  }
}
