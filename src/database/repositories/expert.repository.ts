import { EntityRepository, Repository } from 'typeorm';
import { Expert } from '../entities/expert/expert';
import { CreateExpertDTO } from './dtos/createExpertDTO.interface';
import { UpdateExpertDTO } from './dtos/updateExpertDTO.interface';

@EntityRepository(Expert)
export class expertRespository extends Repository<Expert> {
  async getExperts() {
    const experts = await this.find();

    return experts;
  }

  async getById(id: number) {
    return await this.findOne({ id });
  }

  async createExpert(createExpertDTO: CreateExpertDTO) {
    const { name, phone, password, email, address } = createExpertDTO;

    const expert = new Expert();

    expert.name = name;
    expert.address = address;
    expert.phone = phone;
    expert.email = email;
    expert.password = password;

    await expert.save();

    return expert;
  }

  async updateExpert(id: number, updateExpertDTO: UpdateExpertDTO) {
    const expert = await this.getById(id);

    const { name, phone, password, email, address } = updateExpertDTO;

    expert.name = name;
    expert.address = address;
    expert.phone = phone;
    expert.email = email;
    expert.password = password;

    await expert.save();

    return expert;
  }

  async deleteExpert(id: number) {
    return this.delete({ id });
  }
}
