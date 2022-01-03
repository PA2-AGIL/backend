import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { Expert, ExpertSchema } from 'src/database/entities/expert/expert';
import { ExpertRespository } from 'src/database/repositories/expert.repository';
import { FileUploadModule } from 'src/service/file-upload/file-upload.module';
import { ExpertController } from './expert.controller';
import { ExpertService } from './expert.service';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {
        name: Expert.name,
        schema: ExpertSchema,
      },
    ]),
    FileUploadModule,
  ],
  controllers: [ExpertController],
  providers: [ExpertService, ExpertRespository],
  exports: [ExpertService],
})
export class ExpertModule {}
