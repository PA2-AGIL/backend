import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProducerRepository } from '../../database/repositories/producer/producer.repository';
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

  async getByID(id: number) {
    return this.repository.getByID(id);
  }

  async create(createProducerDTO: CreateProducerDTOImp) {
    return this.repository.createProducer(createProducerDTO);
  }

  async update(id: number, updateProducerDTO: UpdateProducerDTOImp) {
    return this.repository.updateProducer(id, updateProducerDTO);
  }

  async delete(id: number) {
    return this.repository.deleteProducer(id);
  }
}
