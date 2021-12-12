import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Producer } from 'src/database/entities/producer/producer';
import { UpdateProducerDTOImp } from './dtos/updateProducerDTO';
import { ProducerService } from './producer.service';

@Controller('producer')
@ApiTags('producer')
export class ProducerController {
  constructor(private readonly service: ProducerService) {}

  @ApiOkResponse({ type: Producer, isArray: true })
  @Get()
  getProducers(@Query('page') page = 1, @Query('limit') limit = 10) {
    limit = limit > 100 ? 100 : limit;
    return this.service.paginate({
      page,
      limit,
    });
  }

  @ApiOkResponse({ type: Producer })
  @ApiNotFoundResponse()
  @Get('/:id')
  getByID(@Param('id') id: string) {
    return this.service.getByID(id);
  }

  @ApiCreatedResponse({ type: Producer })
  @ApiNotFoundResponse()
  @Put('/:id')
  @UseGuards(AuthGuard())
  update(
    @Param('id') id: string,
    @Body() updateProducerDTO: UpdateProducerDTOImp,
  ) {
    return this.service.update(id, updateProducerDTO);
  }

  @ApiOkResponse({ type: Producer })
  @ApiNotFoundResponse()
  @Delete('/:id')
  @UseGuards(AuthGuard())
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }

  @Get('/all')
  getAllProducers() {
    return this.service.getProducers();
  }
}
