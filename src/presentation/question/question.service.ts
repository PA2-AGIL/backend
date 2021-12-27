import { Injectable } from '@nestjs/common';
import { QuestionRepository } from 'src/database/repositories/question.repository';
import { CreateQuestionDTOImp } from './dto/createQuestionDTO';
import { UpdateQuestionDTOImp } from './dto/updateQuestionDTO';
import { ProducerRepository } from 'src/database/repositories/producer.repository';
import { FileUploadService } from 'src/service/file-upload/file-upload.service';

@Injectable()
export class QuestionService {
  constructor(
    private readonly repository: QuestionRepository,
    private readonly producerRepository: ProducerRepository,
    private readonly fileUploadService: FileUploadService,
  ) {}

  async getQuestions(query: string) {
    return this.repository.getQuestions(query);
  }

  async getByID(id: string) {
    return this.repository.getByID(id);
  }

  async create(
    createQuestion: CreateQuestionDTOImp,
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

    return this.repository.createQuestion(
      createQuestion,
      imagesToQuestion,
      owner,
    );
  }

  async update(id: string, updateQuestion: UpdateQuestionDTOImp) {
    return this.repository.updateQuestion(id, updateQuestion);
  }

  async delete(id: string) {
    return this.repository.deleteQuestion(id);
  }

  // async paginate(ops: IPaginationOptions) {
  //   return await paginate<Question>(this.repository, ops);
  // }
}
