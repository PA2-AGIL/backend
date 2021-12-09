import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Expert } from 'src/database/entities/expert/expert';
import { Producer } from 'src/database/entities/producer/producer';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): Producer | Expert => {
    const req = ctx.switchToHttp().getRequest();

    return req.user;
  },
);
