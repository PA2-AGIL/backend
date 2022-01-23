import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateExpertDTOImp } from 'src/presentation/expert/dtos/createExpertDTO';
import { ExpertService } from 'src/presentation/expert/expert.service';
import { CreateProducerDTOImp } from 'src/presentation/producer/dtos/createProducerDTO';
import { ProducerService } from 'src/presentation/producer/producer.service';
import { SignInDTO } from './dto/signInDTO';
import { JwtPayload } from './payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly expertService: ExpertService,
    private readonly producerService: ProducerService,
    private readonly jwtService: JwtService,
  ) {}

  async singUpExpert(
    createExpertDTO: CreateExpertDTOImp,
    picture: Express.Multer.File,
  ) {
    return this.expertService.create(createExpertDTO, picture);
  }

  async signInExpert(signInDTO: SignInDTO) {
    const { email, password } = signInDTO;

    const expertSignIn = await this.expertService.validate(email, password);

    if (!expertSignIn) {
      throw new UnauthorizedException('Credênciais Inválidas');
    }

    const payload: JwtPayload = {
      id: expertSignIn.id,
      name: expertSignIn.name,
      email: expertSignIn.email,
      type: expertSignIn.type,
    };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async signUpProducer(
    CreateProducerDTO: CreateProducerDTOImp,
    picture: Express.Multer.File,
  ) {
    return this.producerService.create(CreateProducerDTO, picture);
  }

  async signInProducer(signInDTO: SignInDTO) {
    const { email, password } = signInDTO;

    const producerSignIn = await this.producerService.validate(email, password);

    if (!producerSignIn) {
      throw new UnauthorizedException('Credênciais Inválidas');
    }

    const payload: JwtPayload = {
      id: producerSignIn.id,
      name: producerSignIn.name,
      email: producerSignIn.email,
    };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
