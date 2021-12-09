import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { expertRespository } from 'src/database/repositories/expert.repository';
import { FileUploadModule } from 'src/service/file-upload/file-upload.module';
import { ExpertController } from './expert.controller';
import { ExpertService } from './expert.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([expertRespository]),
    FileUploadModule,
  ],
  controllers: [ExpertController],
  providers: [ExpertService],
  exports: [ExpertService],
})
export class ExpertModule {}
