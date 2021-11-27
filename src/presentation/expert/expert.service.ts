import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpertType } from 'src/database/entities/expert/expert-type.enum';
import { UpdateExpertDTO } from 'src/database/repositories/dtos/updateExpertDTO.interface';
import { expertRespository } from 'src/database/repositories/expert.repository';
import { CreateExpertDTOImp } from './dtos/createExpertDTO';

@Injectable()
export class ExpertService {
  constructor(
    @InjectRepository(expertRespository)
    private repository: expertRespository,
  ) {}

  async getExperts() {
    return this.repository.getExperts();
  }

  async getByID(id: string) {
    return this.repository.getById(id);
  }

  async create(createExpertDTO: CreateExpertDTOImp) {
    const { type } = createExpertDTO;

    const isValidType = Object.values(ExpertType).find(
      (value) => value.toString() === type.toUpperCase(),
    );

    if (!isValidType) {
      throw new BadRequestException('Tipo do Especialista é inválido');
    }

    return this.repository.createExpert(createExpertDTO);
  }

  async update(id: string, updateExpertDTO: UpdateExpertDTO) {
    return this.repository.updateExpert(id, updateExpertDTO);
  }

  async delete(id: string) {
    return this.repository.deleteExpert(id);
  }
}
