import { BadRequestException, Injectable } from '@nestjs/common';
import { ExpertType } from 'src/database/entities/expert/expert-type.enum';
import { UpdateExpertDTO } from 'src/database/repositories/dtos/updateExpertDTO.interface';
import { ExpertRespository } from 'src/database/repositories/expert.repository';
import { FileUploadService } from 'src/service/file-upload/file-upload.service';
import { PaginationDTO } from 'src/utils/pagination/dto/paginationDTO';
import { CreateExpertDTOImp } from './dtos/createExpertDTO';

@Injectable()
export class ExpertService {
  constructor(
    private repository: ExpertRespository,
    private readonly fileUploadService: FileUploadService,
  ) {}

  async getExperts(query: string, paginationDTO: PaginationDTO) {
    return this.repository.getExperts(query, paginationDTO);
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
    const { type } = createExpertDTO;

    const isValidType = Object.values(ExpertType).find(
      (value) => value.toString() === type.toUpperCase(),
    );

    if (!isValidType) {
      throw new BadRequestException('Tipo do Especialista é inválido');
    }

    let stringToPicture = null;

    if (profilePicture) {
      const { url } = await this.fileUploadService.uploadPictureProfile(
        profilePicture.buffer,
        profilePicture.originalname,
      );

      stringToPicture = url;
    }

    return this.repository.createExpert(createExpertDTO, stringToPicture);
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
}
