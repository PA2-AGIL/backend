import { MailerModule } from '@nestjs-modules/mailer';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import {
  Password,
  PasswordSchema,
} from 'src/database/entities/password/password';
import { ForgotPasswordRepository } from 'src/database/repositories/forgot-password.repository';
import { ProducerModule } from 'src/presentation/producer/producer.module';
import { ForgotPasswordController } from './forgot-password.controller';
import { ForgotPasswordService } from './forgot-password.service';

@Module({
  imports: [
    forwardRef(() => ProducerModule),
    AuthModule,
    MongooseModule.forFeature([
      {
        name: Password.name,
        schema: PasswordSchema,
      },
    ]),
    MailerModule.forRoot({
      transport: {
        host: '0.0.0.0',
        port: 1025,
      },
      defaults: {
        from: 'admin@pa2.com',
      },
    }),
  ],
  controllers: [ForgotPasswordController],
  providers: [ForgotPasswordService, ForgotPasswordRepository],
})
export class ForgotPasswordModule {}
