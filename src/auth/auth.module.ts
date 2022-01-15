import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ExpertService } from 'src/presentation/expert/expert.service';
import { ProducerService } from 'src/presentation/producer/producer.service';
import { ExpertRespository } from 'src/database/repositories/expert.repository';
import { ProducerRepository } from 'src/database/repositories/producer.repository';
import { FileUploadModule } from 'src/service/file-upload/file-upload.module';
import { JwtStrategy } from './jwtStrategy';
import { MongooseModule } from '@nestjs/mongoose';
import { Expert, ExpertSchema } from 'src/database/entities/expert/expert';
import {
  Producer,
  ProducerSchema,
} from 'src/database/entities/producer/producer';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Expert.name,
        schema: ExpertSchema,
      },
      {
        name: Producer.name,
        schema: ProducerSchema,
      },
    ]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: 'Pa2Agil',
      signOptions: {
        expiresIn: '1d',
      },
    }),
    FileUploadModule,
  ],
  providers: [
    AuthService,
    ExpertService,
    ProducerService,
    JwtStrategy,
    ExpertRespository,
    ProducerRepository,
  ],
  controllers: [AuthController],
  exports: [PassportModule, JwtStrategy, AuthService],
})
export class AuthModule {}
