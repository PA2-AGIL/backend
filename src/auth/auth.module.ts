import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ExpertModule } from 'src/presentation/expert/expert.module';
import { ProducerModule } from 'src/presentation/producer/producer.module';

@Module({
  imports: [ExpertModule, ProducerModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
