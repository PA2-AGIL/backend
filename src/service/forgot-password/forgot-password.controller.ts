import { hash } from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProducerService } from 'src/presentation/producer/producer.service';
import { ForgotPasswordDTOImp } from './dto/forgotPasswordDTO';
import { ResetPasswordDTOImp } from './dto/resetPasswordDTO';
import { ForgotPasswordService } from './forgot-password.service';

@Controller('forgot-password')
@ApiTags('forgot-password')
export class ForgotPasswordController {
  constructor(
    private service: ForgotPasswordService,
    private mailerService: MailerService,
    private producerService: ProducerService,
  ) {}

  @Post('/forgot')
  async forgot(@Body() forgotPassword: ForgotPasswordDTOImp) {
    const token = Math.random().toString(20).substring(2, 12);

    forgotPassword.token = token;

    await this.service.create(forgotPassword);

    const url = `http://localhost:3001/redefinir/${token}`;

    await this.mailerService.sendMail({
      to: forgotPassword.email,
      subject: 'Esqueci a senha',
      html: `Click <a href="${url}">AQUI</a> para redifinir a senha`,
    });

    return {
      message: 'Por favor verifique seu email',
    };
  }

  @Post('/reset')
  async reset(@Body() resetPassword: ResetPasswordDTOImp) {
    const { password, passwordConfirm, token } = resetPassword;

    if (password !== passwordConfirm) {
      throw new BadRequestException(`Passwords don't match`);
    }

    const passwordEntity = await this.service.find(token);

    if (!passwordEntity) throw new NotFoundException('Invalid Token');

    const user = await this.producerService.getByEmail(passwordEntity.email);

    if (!user) throw new NotFoundException(`User not found`);

    user.password = await hash(password, user.salt);

    this.producerService.update(user._id, user);

    return this.service.delete(passwordEntity);
  }
}
