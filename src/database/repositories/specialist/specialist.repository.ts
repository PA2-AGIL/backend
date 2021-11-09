import { NotFoundException } from '@nestjs/common';
import { SpecialistTypes } from 'src/database/entities/specialist/specialist-types.enum';
import { EntityRepository, Repository } from 'typeorm';
import { Specialist } from '../../entities/specialist/specialist';
import { CreateSpecialistDTO } from './dtos/createSpecialistDTO.interface';
import { UpdateSpecialistDTO } from './dtos/updateSpecialistDTO.interface';

@EntityRepository(Specialist)
export class SpecialistRepository extends Repository<Specialist> {
  async getSpecialists() {
    const specialists = await this.find();

    return specialists;
  }

  async getByID(id: number) {
    const specialist = this.findOne({ id });

    if (!specialist) {
      throw new NotFoundException(
        'Não foi possível encontrar o Especialista com este ID',
      );
    }

    return specialist;
  }

  async createSpecialist(createSpecialistDTO: CreateSpecialistDTO) {
    const { email, name, password, phone, type } = createSpecialistDTO;

    const specialist = new Specialist();

    specialist.name = name;
    specialist.email = email;
    specialist.phone = phone;
    specialist.type = SpecialistTypes[type.toUpperCase()];
    specialist.password = password;

    await specialist.save();

    return specialist;
  }

  async updateSpecialist(id: number, updateSpecialistDTO: UpdateSpecialistDTO) {
    const specialist = await this.getByID(id);

    const { email, name, password, phone, type } = updateSpecialistDTO;

    specialist.name = name;
    specialist.email = email;
    specialist.phone = phone;
    specialist.type = SpecialistTypes[type.toUpperCase()];
    specialist.password = password;

    await specialist.save();

    return specialist;
  }

  async deleteSpecialist(id: number) {
    return this.delete({ id });
  }
}
