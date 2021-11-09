import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SpecialistRepository } from 'src/database/repositories/specialist/specialist.repository';
import { CreateSpecialistImp } from './dtos/createSpecialistDTO';
import { UpdateSpecialistDTOImp } from './dtos/updateSpecialistDTO';

@Injectable()
export class SpecialistService {
  constructor(
    @InjectRepository(SpecialistRepository)
    private readonly repository: SpecialistRepository,
  ) {}

  async getSpecialists() {
    return await this.repository.getSpecialists();
  }

  async getByID(id: number) {
    return await this.repository.getByID(id);
  }

  async create(createSpecialistDTO: CreateSpecialistImp) {
    return await this.repository.createSpecialist(createSpecialistDTO);
  }

  async update(id: number, updateSpecialistDTO: UpdateSpecialistDTOImp) {
    return await this.repository.updateSpecialist(id, updateSpecialistDTO);
  }

  async delete(id: number) {
    return await this.repository.deleteSpecialist(id);
  }
}
