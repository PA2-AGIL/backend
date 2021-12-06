import { Injectable } from '@nestjs/common';
import { CreateExpertDTOImp } from 'src/presentation/expert/dtos/createExpertDTO';
import { ExpertService } from 'src/presentation/expert/expert.service';
import { CreateProducerDTOImp } from 'src/presentation/producer/dtos/createProducerDTO';
import { ProducerService } from 'src/presentation/producer/producer.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly expertService: ExpertService,
    private readonly producerService: ProducerService,
  ) {}

  async singUpExpert(
    createExpertDTO: CreateExpertDTOImp,
    picture: Express.Multer.File,
  ) {
    return this.expertService.create(createExpertDTO, picture);
  }

  // async signInExpert() {}

  async signUpProducer(
    CreateProducerDTO: CreateProducerDTOImp,
    picture: Express.Multer.File,
  ) {
    return this.producerService.create(CreateProducerDTO, picture);
  }

  // async signInProducer() {}
}
