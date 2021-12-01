import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProducerDTOImp } from './dtos/createProducerDTO';
import { UpdateProducerDTOImp } from './dtos/updateProducerDTO';
import { ProducerService } from './producer.service';

@Controller('producer')
@ApiTags('producer')
export class ProducerController {
  constructor(private readonly service: ProducerService) {}

  @Get()
  getProducers() {
    return this.service.getProducers();
  }

  @Get('/:id')
  getByID(@Param('id') id: string) {
    return this.service.getByID(id);
  }

  @Post()
  create(@Body() createProducerDTO: CreateProducerDTOImp) {
    return this.service.create(createProducerDTO);
  }

  @Put('/:id')
  update(
    @Param('id') id: string,
    @Body() updateProducerDTO: UpdateProducerDTOImp,
  ) {
    return this.service.update(id, updateProducerDTO);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
