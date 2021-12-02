import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Producer } from 'src/database/entities/producer/producer';
import { CreateProducerDTOImp } from './dtos/createProducerDTO';
import { UpdateProducerDTOImp } from './dtos/updateProducerDTO';
import { ProducerService } from './producer.service';

@Controller('producer')
@ApiTags('producer')
export class ProducerController {
  constructor(private readonly service: ProducerService) {}

  @ApiOkResponse({ type: Producer, isArray: true })
  @Get()
  getProducers() {
    return this.service.getProducers();
  }

  @ApiOkResponse({ type: Producer })
  @ApiNotFoundResponse()
  @Get('/:id')
  getByID(@Param('id') id: string) {
    return this.service.getByID(id);
  }

  @ApiCreatedResponse({ type: Producer })
  @Post()
  @UseInterceptors(FileInterceptor('profilePicture'))
  create(
    @Body() createProducerDTO: CreateProducerDTOImp,
    @UploadedFile() profilePicture: Express.Multer.File,
  ) {
    return this.service.create(createProducerDTO, profilePicture);
  }

  @ApiCreatedResponse({ type: Producer })
  @ApiNotFoundResponse()
  @Put('/:id')
  update(
    @Param('id') id: string,
    @Body() updateProducerDTO: UpdateProducerDTOImp,
  ) {
    return this.service.update(id, updateProducerDTO);
  }

  @ApiOkResponse({ type: Producer })
  @ApiNotFoundResponse()
  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
