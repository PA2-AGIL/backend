import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ExpertModule } from 'src/presentation/expert/expert.module';
import { ProducerModule } from 'src/presentation/producer/producer.module';

@Module({
  imports: [
    ExpertModule,
    ProducerModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: 'Pa2Agil',
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
