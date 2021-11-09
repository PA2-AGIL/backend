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
import { CreateSpecialistImp } from './dtos/createSpecialistDTO';
import { UpdateSpecialistDTOImp } from './dtos/updateSpecialistDTO';
import { SpecialistService } from './specialist.service';

@Controller('specialist')
export class SpecialistController {
  constructor(private readonly service: SpecialistService) {}

  @Get()
  getSpecialists() {
    return this.service.getSpecialists();
  }

  @Get('/:id')
  getByID(@Param('id', ParseIntPipe) id: number) {
    return this.service.getByID(id);
  }

  @Post()
  create(@Body() createSpecialist: CreateSpecialistImp) {
    return this.service.create(createSpecialist);
  }

  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSpecialist: UpdateSpecialistDTOImp,
  ) {
    return this.service.update(id, updateSpecialist);
  }

  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
