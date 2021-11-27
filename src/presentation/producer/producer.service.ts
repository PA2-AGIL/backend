import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProducerRepository } from '../../database/repositories/producer.repository';
import { CreateProducerDTOImp } from './dtos/createProducerDTO';
import { UpdateProducerDTOImp } from './dtos/updateProducerDTO';

@Injectable()
export class ProducerService {
  constructor(
    @InjectRepository(ProducerRepository)
    private repository: ProducerRepository,
  ) {}

  async getProducers() {
    return this.repository.getProducers();
  }

  async getByID(id: string) {
    return this.repository.getByID(id);
  }

  async create(createProducerDTO: CreateProducerDTOImp) {
    return this.repository.createProducer(createProducerDTO);
  }

  async update(id: string, updateProducerDTO: UpdateProducerDTOImp) {
    return this.repository.updateProducer(id, updateProducerDTO);
  }

  async delete(id: string) {
    return this.repository.deleteProducer(id);
  }
}
