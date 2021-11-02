import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProducerService } from './producer.service';
import { ProducerController } from './producer.controller';
import { ProducerRepository } from '../../database/repositories/producer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProducerRepository])],
  providers: [ProducerService],
  controllers: [ProducerController],
})
export class ProducerModule {}
