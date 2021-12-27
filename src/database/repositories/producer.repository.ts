import { EntityRepository, ILike, Repository } from 'typeorm';
import { Producer, ProducerType } from '../entities/producer/producer';
import { genSalt, hash } from 'bcrypt';
import { CreateProducerDTO } from './dtos/createProducerDTO.interface';
import { UpdateProducerDTO } from './dtos/updateProducerDTO.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProducerRepository {
  constructor(
    @InjectModel(Producer.name) private readonly model: Model<ProducerType>,
  ) {}

  async getProducers(query: string) {
    if (query) {
      return await this.model.find({ name: { $in: [query] } });
      // return await this.find({
      //   where: [{ name: ILike(`%${query}%`) }, { email: ILike(`%${query}%`) }],
      // });
    } else {
      return await this.model.find();
    }
  }

  async getByID(id: string) {
    return await this.model.findOne({ id });
  }

  async getByEmail(email: string) {
    return await this.model.findOne({ email });
  }

  async createProducer(
    createProducerDTO: CreateProducerDTO,
    profilePicture: string,
  ) {
    const { name, phone, password, email, address } = createProducerDTO;

    const producer = await this.model.create({});

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
    return this.model.findByIdAndDelete({ id });
  }

  async validate(email: string, password: string) {
    const producerFounded = await this.model.findOne({ email });

    if (!producerFounded) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const hashed = await hash(password, producerFounded.salt);

    if (hashed === producerFounded.password) {
      return producerFounded;
    } else {
      return null;
    }
  }
}
