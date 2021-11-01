import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProducerDTOImp } from './dtos/createProducerDTO';
import { UpdateProducerDTOImp } from './dtos/updateProducerDTO';
import { ProducerService } from './producer.service';

@Controller('producer')
export class ProducerController {
  constructor(private readonly service: ProducerService) {}

  @Get()
  getProducers() {
    return this.service.getProducers();
  }

  @Get('/:id')
  getByID(@Param('id', ParseIntPipe) id: number) {
    return this.service.getByID(id);
  }

  @Post()
  create(@Body() createProducerDTO: CreateProducerDTOImp) {
    return this.service.create(createProducerDTO);
  }

  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProducerDTO: UpdateProducerDTOImp,
  ) {
    return this.service.update(id, updateProducerDTO);
  }

  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
