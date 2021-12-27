import { BadRequestException, Injectable } from '@nestjs/common';
import { FileUploadService } from 'src/service/file-upload/file-upload.service';
import { ProducerRepository } from '../../database/repositories/producer.repository';
import { CreateProducerDTOImp } from './dtos/createProducerDTO';
import { UpdateProducerDTOImp } from './dtos/updateProducerDTO';

@Injectable()
export class ProducerService {
  constructor(
    private repository: ProducerRepository,
    private readonly fileUploadService: FileUploadService,
  ) {}

  async getProducers(query: string) {
    return this.repository.getProducers(query);
  }

  async getByID(id: string) {
    return this.repository.getByID(id);
  }

  async getByEmail(email: string) {
    return this.repository.getByEmail(email);
  }

  async create(
    createProducerDTO: CreateProducerDTOImp,
    profilePicture: Express.Multer.File,
  ) {
    if (!profilePicture) {
      throw new BadRequestException('Imagem é obrigatório');
    }

    const { url } = await this.fileUploadService.uploadPictureProfile(
      profilePicture.buffer,
      profilePicture.originalname,
    );

    return this.repository.createProducer(createProducerDTO, url);
  }

  async update(id: string, updateProducerDTO: UpdateProducerDTOImp) {
    return this.repository.updateProducer(id, updateProducerDTO);
  }

  async delete(id: string) {
    return this.repository.deleteProducer(id);
  }

  async validate(email: string, password: string) {
    return this.repository.validate(email, password);
  }

  // async paginate(ops: IPaginationOptions) {
  //   return await paginate<Producer>(this.repository, ops);
  // }
}
