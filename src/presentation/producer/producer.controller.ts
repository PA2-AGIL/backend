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
import { PaginationDTO } from 'src/utils/pagination/dto/paginationDTO';
import { UpdateProducerDTOImp } from './dtos/updateProducerDTO';
import { ProducerService } from './producer.service';

@Controller('producer')
@ApiTags('producer')
export class ProducerController {
  constructor(private readonly service: ProducerService) {}

  @Get('/all')
  getAllProducers(
    @Query('query') query: string,
    @Query() paginationDTO: PaginationDTO,
  ) {
    paginationDTO.limit = Number(paginationDTO.limit);
    paginationDTO.page = Number(paginationDTO.page);

    return this.service.getProducers(query, paginationDTO);
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
}
