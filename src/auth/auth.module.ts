import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ExpertService } from 'src/presentation/expert/expert.service';
import { ProducerService } from 'src/presentation/producer/producer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpertRespository } from 'src/database/repositories/expert.repository';
import { ProducerRepository } from 'src/database/repositories/producer.repository';
import { FileUploadModule } from 'src/service/file-upload/file-upload.module';
import { JwtStrategy } from './jwtStrategy';
import { MongooseModule } from '@nestjs/mongoose';
import { Expert, ExpertSchema } from 'src/database/entities/expert/expert';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Expert.name,
        schema: ExpertSchema,
      },
    ]),
    TypeOrmModule.forFeature([ProducerRepository]),
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
  ],
  controllers: [AuthController],
  exports: [PassportModule, JwtStrategy],
})
export class AuthModule {}
