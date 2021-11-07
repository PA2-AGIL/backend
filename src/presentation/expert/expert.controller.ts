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
import { CreateExpertDTOImp } from './dtos/createExpertDTO';
import { UpdateExpertDTOImp } from './dtos/updateExpertDTO';
import { ExpertService } from './expert.service';

@Controller('expert')
export class ExpertController {
  constructor(private readonly service: ExpertService) {}

  @Get()
  getExperts() {
    return this.service.getExperts();
  }

  @Get('/:id')
  getByID(@Param('id', ParseIntPipe) id: number) {
    return this.service.getByID(id);
  }

  @Post()
  create(@Body() createExpertDTO: CreateExpertDTOImp) {
    return this.service.create(createExpertDTO);
  }

  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExpertDTO: UpdateExpertDTOImp,
  ) {
    return this.service.update(id, updateExpertDTO);
  }

  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
