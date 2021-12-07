import { EntityRepository, Repository } from 'typeorm';
import { Producer } from '../entities/producer/producer';
import { genSalt, hash } from 'bcrypt';
import { CreateProducerDTO } from './dtos/createProducerDTO.interface';
import { UpdateProducerDTO } from './dtos/updateProducerDTO.interface';

@EntityRepository(Producer)
export class ProducerRepository extends Repository<Producer> {
  async getProducers() {
    const producers = await this.find();

    return producers;
  }

  async getByID(id: string) {
    return await this.findOne({ id });
  }

  async createProducer(
    createProducerDTO: CreateProducerDTO,
    profilePicture: string,
  ) {
    const { name, phone, password, email, address } = createProducerDTO;

    const producer = new Producer();

    producer.name = name;
    producer.address = address;
    producer.phone = phone;
    producer.email = email;
    producer.salt = await genSalt();
    producer.password = await hash(password, producer.salt);
    producer.profilePicture = profilePicture;

    await producer.save();

    return producer;
  }

  async updateProducer(id: string, updateProducertDTO: UpdateProducerDTO) {
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

  async deleteProducer(id: string) {
    return this.delete({ id });
  }
}
