import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Expert } from 'src/database/entities/expert/expert';
import { ExpertType } from 'src/database/entities/expert/expert-type.enum';
import { UpdateExpertDTO } from 'src/database/repositories/dtos/updateExpertDTO.interface';
import { expertRespository } from 'src/database/repositories/expert.repository';
import { FileUploadService } from 'src/service/file-upload/file-upload.service';
import { CreateExpertDTOImp } from './dtos/createExpertDTO';

@Injectable()
export class ExpertService {
  constructor(
    @InjectRepository(expertRespository)
    private repository: expertRespository,
    private readonly fileUploadService: FileUploadService,
  ) {}

  async getExperts() {
    return this.repository.getExperts();
  }

  async getByID(id: string) {
    return this.repository.getById(id);
  }

  async getByEmail(email: string) {
    return this.repository.getByEmail(email);
  }

  async create(
    createExpertDTO: CreateExpertDTOImp,
    profilePicture: Express.Multer.File,
  ) {
    if (!profilePicture) {
      throw new BadRequestException('Imagem é obrigatório');
    }

    const { type } = createExpertDTO;

    const isValidType = Object.values(ExpertType).find(
      (value) => value.toString() === type.toUpperCase(),
    );

    if (!isValidType) {
      throw new BadRequestException('Tipo do Especialista é inválido');
    }

    const { url } = await this.fileUploadService.uploadPictureProfile(
      profilePicture.buffer,
      profilePicture.originalname,
    );

    return this.repository.createExpert(createExpertDTO, url);
  }

  async update(id: string, updateExpertDTO: UpdateExpertDTO) {
    return this.repository.updateExpert(id, updateExpertDTO);
  }

  async delete(id: string) {
    return this.repository.deleteExpert(id);
  }

  async validate(email: string, password: string) {
    return this.repository.validate(email, password);
  }

  async paginate(ops: IPaginationOptions) {
    return await paginate<Expert>(this.repository, ops);
  }
}
