import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ForgotPasswordDTOImp } from 'src/service/forgot-password/dto/forgotPasswordDTO';
import { Password } from '../entities/password/password';

@Injectable()
export class ForgotPasswordRepository {
  constructor(
    @InjectModel(Password.name) private readonly model: Model<Password>,
  ) {}

  async getByToken(token: string) {
    return await this.model.findOne({ token: token });
  }

  async createForgotPassword(forgotPasswordDTO: ForgotPasswordDTOImp) {
    const fpassword = await this.model.create(forgotPasswordDTO);

    await fpassword.save();

    return fpassword;
  }

  async deleteForgotPassword(pw: Password) {
    return this.model.findByIdAndDelete(pw);
  }
}
