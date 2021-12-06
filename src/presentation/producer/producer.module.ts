import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProducerService } from './producer.service';
import { ProducerController } from './producer.controller';
import { ProducerRepository } from '../../database/repositories/producer.repository';
import { FileUploadModule } from 'src/service/file-upload/file-upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProducerRepository]), FileUploadModule],
  providers: [ProducerService],
  controllers: [ProducerController],
  exports: [ProducerService],
})
export class ProducerModule {}
