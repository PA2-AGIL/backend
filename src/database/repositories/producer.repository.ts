import { Producer, ProducerType } from '../entities/producer/producer';
import { genSalt, hash } from 'bcrypt';
import { CreateProducerDTO } from './dtos/createProducerDTO.interface';
import { UpdateProducerDTO } from './dtos/updateProducerDTO.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pagination } from 'src/utils/pagination/pagination';
import { PaginationDTO } from 'src/utils/pagination/dto/paginationDTO';

@Injectable()
export class ProducerRepository {
  constructor(
    @InjectModel(Producer.name) private readonly model: Model<ProducerType>,
  ) {}

  async getProducers(
    query: string,
    paginationDTO: PaginationDTO,
  ): Promise<Pagination<Producer[]>> {
    const { limit, page } = paginationDTO;

    const skippedItems = (page - 1) * limit;

    if (query) {
      const result = await this.model
        .find({
          $or: [{ name: { $in: [query] } }, { email: { $in: [query] } }],
        })
        .select('-password')
        .select('-salt')
        .limit(limit)
        .skip(skippedItems)
        .sort({
          name: 'asc',
        });

      return {
        data: result,
        limit,
        page,
        totalCount: result.length,
      };
    } else {
      const result = await this.model
        .find()
        .select('-password')
        .select('-salt')
        .limit(limit)
        .skip(skippedItems)
        .sort({
          name: 'asc',
        });

      return {
        data: result,
        limit,
        page,
        totalCount: result.length,
      };
    }
  }

  async getByID(id: string) {
    return await this.model
      .findById(id)
      .populate('questionsLiked')
      .populate('questionsDisliked');
  }

  async getByEmail(email: string) {
    return await this.model.findOne({ email });
  }

  async createProducer(
    createProducerDTO: CreateProducerDTO,
    profilePicture: string,
  ) {
    const { name, phone, password, email, address } = createProducerDTO;

    const saltGen = await genSalt();

    const producer = await this.model.create({
      name,
      address,
      phone,
      email,
      salt: saltGen,
      password: await hash(password, saltGen),
      profilePicture,
    });

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
