import { BadRequestException, Injectable } from '@nestjs/common';
import { QuestionRepository } from 'src/database/repositories/question.repository';
import { CreateQuestionDTOImp } from './dto/createQuestionDTO';
import { UpdateQuestionDTOImp } from './dto/updateQuestionDTO';
import { ProducerRepository } from 'src/database/repositories/producer.repository';
import { FileUploadService } from 'src/service/file-upload/file-upload.service';
import { PaginationDTO } from 'src/utils/pagination/dto/paginationDTO';
import { ExpertRespository } from 'src/database/repositories/expert.repository';
import { Expert } from 'src/database/entities/expert/expert';
import { ExpertType } from 'src/database/entities/expert/expert-type.enum';
import { Document } from 'mongoose';
import { Producer } from 'src/database/entities/producer/producer';
import { Question } from 'src/database/entities/question/question';

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
    const { tags } = createQuestionDTO;

    const isValidTags = tags.every((tag) => {
      return Object.values(ExpertType).find((value) => {
        return value.toString() === tag.toUpperCase();
      });
    });

    if (!isValidTags) {
      throw new BadRequestException(
        'As tags possuem pelo menos um tipo errado',
      );
    }

    const owner = await this.producerRepository.getByID(ownerId);

    let imagesToQuestion;

    if (files) {
      imagesToQuestion = await Promise.all(
        files.map(
          async (file) =>
            await this.fileUploadService.upload(file.buffer, file.originalname),
        ),
      );
    }

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
      return await this.handleLikeQuestion(questionToLiked, expertFounded);
    }

    if (producerFounded) {
      return await this.handleLikeQuestion(questionToLiked, producerFounded);
    }
  }

  async dislikeQuestion(id: string, userId: string) {
    const expertFounded = await this.expertRepository.getById(userId);
    const producerFounded = await this.producerRepository.getByID(userId);
    const questionToDisliked = await this.repository.getByID(id);

    if (expertFounded) {
      return await this.handleDislikeQuestion(
        questionToDisliked,
        expertFounded,
      );
    }

    if (producerFounded) {
      return await this.handleDislikeQuestion(
        questionToDisliked,
        producerFounded,
      );
    }
  }

  private async handleLikeQuestion(
    question: Question & Document,
    user: (Expert & Document) | (Producer & Document),
  ) {
    const alreadyLikedQuestions = user.questionsLiked.find(
      (q) => q._id.toString() === question._id.toString(),
    );

    const dislikedQuestionToLikeIt = user.questionsDisliked.find(
      (q) => q._id.toString() === question._id.toString(),
    );

    if (alreadyLikedQuestions === undefined) {
      if (dislikedQuestionToLikeIt) {
        return await this.likeDislikedQuestion(question._id.toString(), user);
      }
      return await this.likeNewQuestion(question._id.toString(), user);
    } else if (dislikedQuestionToLikeIt) {
      return await this.likeDislikedQuestion(question._id.toString(), user);
    } else {
      throw new BadRequestException(
        `O usuário ${user.name} já deu like nesta questão`,
      );
    }
  }

  private async handleDislikeQuestion(
    question: Question & Document,
    user: (Expert & Document) | (Producer & Document),
  ) {
    const alreadyDislikedQuestions = user.questionsDisliked.find(
      (q) => q._id.toString() === question._id.toString(),
    );

    const likedQuestionToDislikeIt = user.questionsLiked.find(
      (q) => q._id.toString() === question._id.toString(),
    );

    if (alreadyDislikedQuestions === undefined) {
      if (likedQuestionToDislikeIt) {
        return await this.deslikeLikedQuestion(
          likedQuestionToDislikeIt._id.toString(),
          user,
        );
      }
      return await this.deslikeNewQuestion(question._id.toString(), user);
    } else if (likedQuestionToDislikeIt !== undefined) {
      return await this.deslikeLikedQuestion(
        likedQuestionToDislikeIt._id.toString(),
        user,
      );
    } else {
      throw new BadRequestException(
        `O usuário ${user.name} já deu dislike nesta questão`,
      );
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
      user.questionsDisliked.indexOf(removeQuestionDesliked) + 1,
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
      user.questionsLiked.indexOf(removeQuestionLiked) + 1,
      1,
    );

    const questionDisliked = await this.repository.dislikeQuestion(id);

    user.questionsDisliked.push(questionDisliked);

    await user.save();

    return questionDisliked;
  }
}
