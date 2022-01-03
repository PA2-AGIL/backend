import { Injectable } from '@nestjs/common';
import { FileUploadService } from 'src/service/file-upload/file-upload.service';
import { PaginationDTO } from 'src/utils/pagination/dto/paginationDTO';
import { ProducerRepository } from '../../database/repositories/producer.repository';
import { CreateProducerDTOImp } from './dtos/createProducerDTO';
import { UpdateProducerDTOImp } from './dtos/updateProducerDTO';

@Injectable()
export class ProducerService {
  constructor(
    private repository: ProducerRepository,
    private readonly fileUploadService: FileUploadService,
  ) {}

  async getProducers(query: string, paginationDTO: PaginationDTO) {
    return this.repository.getProducers(query, paginationDTO);
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
    let stringToPicture = null;

    if (profilePicture) {
      const { url } = await this.fileUploadService.uploadPictureProfile(
        profilePicture.buffer,
        profilePicture.originalname,
      );

      stringToPicture = url;
    }

    return this.repository.createProducer(createProducerDTO, stringToPicture);
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
}
