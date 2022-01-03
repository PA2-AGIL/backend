import { Module } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { ProducerController } from './producer.controller';
import { ProducerRepository } from '../../database/repositories/producer.repository';
import { FileUploadModule } from 'src/service/file-upload/file-upload.module';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Producer,
  ProducerSchema,
} from 'src/database/entities/producer/producer';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {
        name: Producer.name,
        schema: ProducerSchema,
      },
    ]),
    FileUploadModule,
  ],
  providers: [ProducerService, ProducerRepository],
  controllers: [ProducerController],
  exports: [ProducerService],
})
export class ProducerModule {}
