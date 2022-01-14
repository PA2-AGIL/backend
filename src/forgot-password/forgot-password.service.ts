import { Injectable } from '@nestjs/common';
import { Password } from 'src/database/entities/password/password';
import { ForgotPasswordDTO } from 'src/database/repositories/dtos/forgotPasswordDTO.interface';
import { ForgotPasswordRepository } from 'src/database/repositories/forgot-password.repository';

@Injectable()
export class ForgotPasswordService {
  constructor(private readonly repository: ForgotPasswordRepository) {}

  async create(body: ForgotPasswordDTO) {
    return this.repository.createForgotPassword(body);
  }

  async find(token: string) {
    return this.repository.getByToken(token);
  }

  async delete(pw: Password) {
    return this.repository.deleteForgotPassword(pw);
  }
}
