import { Injectable } from '@nestjs/common';
import { QuestionRepository } from 'src/database/repositories/question.repository';
import { CreateQuestionDTOImp } from './dto/createQuestionDTO';
import { UpdateQuestionDTOImp } from './dto/updateQuestionDTO';
import { ProducerRepository } from 'src/database/repositories/producer.repository';
import { FileUploadService } from 'src/service/file-upload/file-upload.service';
import { PaginationDTO } from 'src/utils/pagination/dto/paginationDTO';
import { ExpertRespository } from 'src/database/repositories/expert.repository';

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
    return this.repository.getByID(id);
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

    return createdQuestion;
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

      if (alreadyLikedQuestions === undefined) {
        const likedQuestion = await this.repository.likeQuestion(id);

        expertFounded.questionsLiked.push(likedQuestion);

        await expertFounded.save();

        return likedQuestion;
      } else {
        console.log('A questão ja foi dado like');
      }
    }

    if (producerFounded) {
      const alreadyLikedQuestions = producerFounded.questionsLiked.find(
        (question) =>
          question._id.toString() === questionToLiked._id.toString(),
      );

      if (alreadyLikedQuestions === undefined) {
        const likedQuestion = await this.repository.likeQuestion(id);

        producerFounded.questionsLiked.push(likedQuestion);

        await producerFounded.save();

        return likedQuestion;
      } else {
        console.log('A questão ja foi dado like');
      }
    }

    // if (
    //   !expertFounded.questionsAlreadyLiked.includes(questionToLiked) &&
    //   !expertFounded.questionsAlreadyDisliked.includes(questionToLiked)
    // ) {
    // const likedQuestion = await this.repository.likeQuestion(id);

    // expertFounded.questionsLiked.push(likedQuestion);

    // await expertFounded.save();

    // return likedQuestion;
    // }
    // if (
    //   !expertFounded.questionsAlreadyLiked.includes(questionToLiked) &&
    //   expertFounded.questionsAlreadyDisliked.includes(questionToLiked)
    // ) {
    //   const likedQuestion = await this.repository.likeQuestion(id);

    //   expertFounded.questionsAlreadyDisliked.splice(
    //     expertFounded.questionsAlreadyDisliked.indexOf(likedQuestion),
    //     1,
    //   );
    // } else if (producerFounded) {
    //   if (!producerFounded.questionsAlreadyLiked.includes(questionToLiked)) {
    //     const likedQuestion = await this.repository.likeQuestion(id);

    //     producerFounded.questionsAlreadyLiked.push(likedQuestion);

    //     await producerFounded.save();

    //     return likedQuestion;
    //   }
    // }
  }

  async dislikeQuestion(id: string) {
    return this.repository.dislikeQuestion(id);
  }
}
