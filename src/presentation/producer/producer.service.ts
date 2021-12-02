import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileUploadService } from 'src/service/file-upload/file-upload.service';
import { ProducerRepository } from '../../database/repositories/producer.repository';
import { CreateProducerDTOImp } from './dtos/createProducerDTO';
import { UpdateProducerDTOImp } from './dtos/updateProducerDTO';

@Injectable()
export class ProducerService {
  constructor(
    @InjectRepository(ProducerRepository)
    private repository: ProducerRepository,
    private readonly fileUploadService: FileUploadService,
  ) {}

  async getProducers() {
    return this.repository.getProducers();
  }

  async getByID(id: string) {
    return this.repository.getByID(id);
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
}
