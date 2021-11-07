import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { expertRespository } from 'src/database/repositories/expert.repository';
import { ExpertController } from './expert.controller';
import { ExpertService } from './expert.service';

@Module({
  imports: [TypeOrmModule.forFeature([expertRespository])],
  controllers: [ExpertController],
  providers: [ExpertService],
})
export class ExpertModule {}
