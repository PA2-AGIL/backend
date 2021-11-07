import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  async getByID(id: number) {
    return this.repository.getById(id);
  }

  async create(createExpertDTO: CreateExpertDTOImp) {
    return this.repository.createExpert(createExpertDTO);
  }

  async update(id: number, updateExpertDTO: UpdateExpertDTO) {
    return this.repository.updateExpert(id, updateExpertDTO);
  }

  async delete(id: number) {
    return this.repository.deleteExpert(id);
  }
}
