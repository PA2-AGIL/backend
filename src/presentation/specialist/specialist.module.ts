import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecialistRepository } from 'src/database/repositories/specialist/specialist.repository';
import { SpecialistController } from './specialist.controller';
import { SpecialistService } from './specialist.service';

@Module({
  imports: [TypeOrmModule.forFeature([SpecialistRepository])],
  controllers: [SpecialistController],
  providers: [SpecialistService],
})
export class SpecialistModule {}
