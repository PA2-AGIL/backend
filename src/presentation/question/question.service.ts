import { Injectable } from '@nestjs/common';
import { QuestionRepository } from 'src/database/repositories/question.repository';
import { CreateQuestionDTOImp } from './dto/createQuestionDTO';
import { UpdateQuestionDTOImp } from './dto/updateQuestionDTO';
import { ProducerRepository } from 'src/database/repositories/producer.repository';
import { FileUploadService } from 'src/service/file-upload/file-upload.service';
import { PaginationDTO } from 'src/utils/pagination/dto/paginationDTO';
import { ExpertRespository } from 'src/database/repositories/expert.repository';
import { Expert } from 'src/database/entities/expert/expert';
import { Document } from 'mongoose';
import { Producer } from 'src/database/entities/producer/producer';

@Injectable()
export class QuestionService {
  constructor(
    private readonly repository: QuestionRepository,
    private readonly producerRepository: ProducerRepository,
    private readonly expertRepository: ExpertRespository,
    private readonly fileUploadService: FileUploadService,
  ) {}

  async getQuestions(query: string, paginationDTO: PaginationDTO) {
    return this.repository.getQuestions(query, paginationDTO);
  }

  async getByID(id: string) {
    return this.repository.getQuestion(id);
  }

  async create(
    createQuestionDTO: CreateQuestionDTOImp,
    files: Express.Multer.File[],
    ownerId: string,
  ) {
    const owner = await this.producerRepository.getByID(ownerId);

    const imagesToQuestion = await Promise.all(
      files.map(
        async (file) =>
          await this.fileUploadService.upload(file.buffer, file.originalname),
      ),
    );

    const createdQuestion = await this.repository.createQuestion(
      createQuestionDTO,
      imagesToQuestion,
      owner,
    );

    owner.questions.push(createdQuestion);

    await owner.save();

    return;
  }

  async update(id: string, updateQuestion: UpdateQuestionDTOImp) {
    return this.repository.updateQuestion(id, updateQuestion);
  }

  async delete(id: string) {
    return this.repository.deleteQuestion(id);
  }

  async likeQuestion(id: string, userId: string) {
    const expertFounded = await this.expertRepository.getById(userId);
    const producerFounded = await this.producerRepository.getByID(userId);
    const questionToLiked = await this.repository.getByID(id);

    if (expertFounded) {
      const alreadyLikedQuestions = expertFounded.questionsLiked.find(
        (question) =>
          question._id.toString() === questionToLiked._id.toString(),
      );

      const dislikedQuestionToLikeIt = expertFounded.questionsDisliked.find(
        (question) =>
          question._id.toString() === questionToLiked._id.toString(),
      );

      if (alreadyLikedQuestions === undefined) {
        return await this.likeNewQuestion(id, expertFounded);
      } else if (dislikedQuestionToLikeIt) {
        return await this.likeDislikedQuestion(id, expertFounded);
      } else {
        console.log('A questão ja foi dado like');
      }
    }

    if (producerFounded) {
      const alreadyLikedQuestions = producerFounded.questionsLiked.find(
        (question) =>
          question._id.toString() === questionToLiked._id.toString(),
      );

      const dislikedQuestionToLikeIt = producerFounded.questionsDisliked.find(
        (question) =>
          question._id.toString() === questionToLiked._id.toString(),
      );

      if (alreadyLikedQuestions === undefined) {
        return await this.likeNewQuestion(id, producerFounded);
      } else if (dislikedQuestionToLikeIt) {
        return await this.likeDislikedQuestion(id, producerFounded);
      } else {
        console.log('A questão ja foi dado like');
      }
    }
  }

  async dislikeQuestion(id: string, userId: string) {
    const expertFounded = await this.expertRepository.getById(userId);
    const producerFounded = await this.producerRepository.getByID(userId);
    const questionToDisliked = await this.repository.getByID(id);

    if (expertFounded) {
      const alreadyDislikedQuestions = expertFounded.questionsDisliked.find(
        (question) =>
          question._id.toString() === questionToDisliked._id.toString(),
      );

      const likedQuestionToDislikeIt = expertFounded.questionsLiked.find(
        (question) =>
          question._id.toString() === questionToDisliked._id.toString(),
      );

      if (alreadyDislikedQuestions === undefined) {
        return await this.deslikeNewQuestion(id, expertFounded);
      } else if (likedQuestionToDislikeIt) {
        return await this.deslikeLikedQuestion(id, expertFounded);
      } else {
        console.log('A questão ja foi dada dislike');
      }
    }

    if (producerFounded) {
      const alreadyDislikedQuestions = producerFounded.questionsDisliked.find(
        (question) =>
          question._id.toString() === questionToDisliked._id.toString(),
      );

      const likedQuestionToDislikeIt = producerFounded.questionsLiked.find(
        (question) =>
          question._id.toString() === questionToDisliked._id.toString(),
      );

      if (alreadyDislikedQuestions === undefined) {
        return await this.deslikeNewQuestion(id, producerFounded);
      } else if (likedQuestionToDislikeIt) {
        return await this.deslikeLikedQuestion(id, producerFounded);
      } else {
        console.log('A questão ja foi dada dislike');
      }
    }
  }

  private async likeNewQuestion(
    id: string,
    user: (Expert & Document) | (Producer & Document),
  ) {
    const likedQuestion = await this.repository.likeQuestion(id);

    user.questionsLiked.push(likedQuestion);

    await user.save();

    return likedQuestion;
  }

  private async deslikeNewQuestion(
    id: string,
    user: (Expert & Document) | (Producer & Document),
  ) {
    const dislikedQuestion = await this.repository.dislikeQuestion(id);

    user.questionsDisliked.push(dislikedQuestion);

    await user.save();

    return dislikedQuestion;
  }

  private async likeDislikedQuestion(
    id: string,
    user: (Expert & Document) | (Producer & Document),
  ) {
    const removeQuestionDesliked =
      await this.repository.removeDislikedFromQuestion(id);

    user.questionsDisliked.splice(
      user.questionsDisliked.indexOf(removeQuestionDesliked),
      1,
    );

    const questionLiked = await this.repository.likeQuestion(id);

    user.questionsLiked.push(questionLiked);

    await user.save();

    return questionLiked;
  }

  private async deslikeLikedQuestion(
    id: string,
    user: (Expert & Document) | (Producer & Document),
  ) {
    const removeQuestionLiked = await this.repository.removeLikedFromQuestion(
      id,
    );

    user.questionsLiked.splice(
      user.questionsLiked.indexOf(removeQuestionLiked),
      1,
    );

    const questionDisliked = await this.repository.dislikeQuestion(id);

    user.questionsLiked.push(questionDisliked);

    await user.save();

    return questionDisliked;
  }
}
