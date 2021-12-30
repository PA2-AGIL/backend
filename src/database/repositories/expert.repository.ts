import { genSalt, hash } from 'bcrypt';
import { Expert, ExpertType } from '../entities/expert/expert';
import { CreateExpertDTO } from './dtos/createExpertDTO.interface';
import { UpdateExpertDTO } from './dtos/updateExpertDTO.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pagination } from 'src/utils/pagination/pagination';
import { PaginationDTO } from 'src/utils/pagination/dto/paginationDTO';

@Injectable()
export class ExpertRespository {
  constructor(
    @InjectModel(Expert.name)
    private readonly model: Model<ExpertType>,
  ) {}

  async getExperts(
    query: string,
    paginationDTO: PaginationDTO,
  ): Promise<Pagination<Expert[]>> {
    const { limit, page } = paginationDTO;

    const skippedItems = (page - 1) * limit;

    if (query) {
      const result = await this.model
        .find({
          $or: [
            { name: { $in: [query] } },
            { email: { $in: [query] } },
            { type: { $in: [query] } },
          ],
        })
        .select('-password')
        .select('-salt')
        .limit(limit)
        .skip(skippedItems)
        .sort({
          name: 'asc',
        });
      // return await this.model.find({
      //   where: [
      //     { name:  },
      //     { email: (`%${query}%`) },
      //     { type: (`%${query}%`) },
      //   ],
      // });

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

  async getById(id: string) {
    return await this.model.findOne({ id });
  }

  async getByEmail(email: string) {
    return await this.model.findOne({ email });
  }

  async createExpert(createExpertDTO: CreateExpertDTO, profilePicture: string) {
    const { name, phone, password, email, address, type } = createExpertDTO;

    const saltGen = await genSalt();

    const expert = await this.model.create({
      name,
      address,
      phone,
      email,
      type,
      salt: saltGen,
      password: await hash(password, saltGen),
      profilePicture,
    });

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
