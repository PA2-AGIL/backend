import { EntityRepository, Repository } from 'typeorm';
import { genSalt, hash } from 'bcrypt';
import { Expert } from '../entities/expert/expert';
import { CreateExpertDTO } from './dtos/createExpertDTO.interface';
import { UpdateExpertDTO } from './dtos/updateExpertDTO.interface';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(Expert)
export class expertRespository extends Repository<Expert> {
  async getExperts() {
    const experts = await this.find();

    return experts;
  }

  async getById(id: string) {
    return await this.findOne({ id });
  }

  async createExpert(createExpertDTO: CreateExpertDTO, profilePicture: string) {
    const { name, phone, password, email, address, type } = createExpertDTO;

    const expert = new Expert();

    expert.name = name;
    expert.address = address;
    expert.phone = phone;
    expert.email = email;
    expert.type = type;
    expert.salt = await genSalt();
    expert.password = await hash(password, expert.salt);
    expert.profilePicture = profilePicture;

    await expert.save();

    return expert;
  }

  async updateExpert(id: string, updateExpertDTO: UpdateExpertDTO) {
    const expert = await this.getById(id);

    const { name, phone, password, email, address, type } = updateExpertDTO;

    expert.name = name;
    expert.address = address;
    expert.phone = phone;
    expert.email = email;
    expert.password = password;
    expert.type = type;

    await expert.save();

    return expert;
  }

  async deleteExpert(id: string) {
    return this.delete({ id });
  }

  async validate(email: string, password: string) {
    const expertFounded = await this.findOne({ email });

    if (!expertFounded) {
      throw new NotFoundException('Especialista não encontrado');
    }

    const hashed = await hash(password, expertFounded.salt);

    if (hashed === expertFounded.password) {
      return expertFounded;
    } else {
      return null;
    }
  }
}
