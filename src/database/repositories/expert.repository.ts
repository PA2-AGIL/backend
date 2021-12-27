import { genSalt, hash } from 'bcrypt';
import { Expert, ExpertType } from '../entities/expert/expert';
import { CreateExpertDTO } from './dtos/createExpertDTO.interface';
import { UpdateExpertDTO } from './dtos/updateExpertDTO.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ExpertRespository {
  constructor(
    @InjectModel(Expert.name)
    private readonly model: Model<ExpertType>,
  ) {}

  async getExperts(query: string) {
    if (query) {
      return await this.model.find({ name: { $in: [query] } });
      // return await this.model.find({
      //   where: [
      //     { name:  },
      //     { email: (`%${query}%`) },
      //     { type: (`%${query}%`) },
      //   ],
      // });
    } else {
      return await this.model.find();
    }
  }

  async getById(id: string) {
    return await this.model.findOne({ id });
  }

  async getByEmail(email: string) {
    return await this.model.findOne({ email });
  }

  async createExpert(createExpertDTO: CreateExpertDTO, profilePicture: string) {
    const { name, phone, password, email, address, type } = createExpertDTO;

    const expert = await this.model.create({});

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
    return this.model.findByIdAndDelete({ id });
  }

  async validate(email: string, password: string) {
    const expertFounded = await this.model.findOne({ email });

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
