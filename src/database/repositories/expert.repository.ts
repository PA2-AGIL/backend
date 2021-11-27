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

  async getById(id: string) {
    return await this.findOne({ id });
  }

  async createExpert(createExpertDTO: CreateExpertDTO) {
    const { name, phone, password, email, address, type } = createExpertDTO;

    const expert = new Expert();

    expert.name = name;
    expert.address = address;
    expert.phone = phone;
    expert.email = email;
    expert.type = type;
    expert.password = password;

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
}
