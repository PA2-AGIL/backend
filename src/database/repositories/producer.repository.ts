import { EntityRepository, Repository } from 'typeorm';
import { Producer } from '../entities/producer/producer';
import { CreateProducerDTO } from './dtos/createProducerDTO.interface';
import { UpdateProducerDTO } from './dtos/updateProducerDTO.interface';

@EntityRepository(Producer)
export class ProducerRepository extends Repository<Producer> {
  async getProducers() {
    const producers = await this.find();

    return producers;
  }

  async getByID(id: number) {
    return await this.findOne({ id });
  }

  async createProducer(createProducerDTO: CreateProducerDTO) {
    const { name, phone, password, email, address } = createProducerDTO;

    const producer = new Producer();

    producer.name = name;
    producer.address = address;
    producer.phone = phone;
    producer.email = email;
    producer.password = password;

    await producer.save();

    return producer;
  }

  async updateProducer(id: number, updateProducertDTO: UpdateProducerDTO) {
    const producer = await this.getByID(id);

    const { address, phone, password, email, name } = updateProducertDTO;

    producer.name = name;
    producer.address = address;
    producer.phone = phone;
    producer.email = email;
    producer.password = password;

    await producer.save();

    return producer;
  }

  async deleteProducer(id: number) {
    return this.delete({ id });
  }
}
