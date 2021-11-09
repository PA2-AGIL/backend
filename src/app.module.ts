import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProducerModule } from './presentation/producer/producer.module';
import { SpecialistModule } from './presentation/specialist/specialist.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRoot(),
    ProducerModule,
    SpecialistModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
