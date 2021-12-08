import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ExpertService } from 'src/presentation/expert/expert.service';
import { ProducerService } from 'src/presentation/producer/producer.service';
import { JwtPayload } from './payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly producerService: ProducerService,
    private readonly expertService: ExpertService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '' + process.env.SECRET_KEY,
    });
  }

  async validate(payload: JwtPayload) {
    const { email } = payload;

    const producerFounded = await this.producerService.getByEmail(email);
    const expertFounded = await this.expertService.getByEmail(email);

    if (producerFounded) {
      return producerFounded;
    } else if (expertFounded) {
      return expertFounded;
    } else {
      return null;
    }
  }
}
