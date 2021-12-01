import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Expert } from 'src/database/entities/expert/expert';
import { CreateExpertDTOImp } from './dtos/createExpertDTO';
import { UpdateExpertDTOImp } from './dtos/updateExpertDTO';
import { ExpertService } from './expert.service';

@Controller('expert')
@ApiTags('expert')
export class ExpertController {
  constructor(private readonly service: ExpertService) {}

  @ApiOkResponse({ type: Expert, isArray: true })
  @Get()
  getExperts() {
    return this.service.getExperts();
  }

  @ApiOkResponse({ type: Expert })
  @ApiNotFoundResponse()
  @Get('/:id')
  getByID(@Param('id') id: string) {
    return this.service.getByID(id);
  }

  @ApiCreatedResponse({ type: Expert })
  @Post()
  create(@Body() createExpertDTO: CreateExpertDTOImp) {
    return this.service.create(createExpertDTO);
  }

  @ApiCreatedResponse({ type: Expert })
  @ApiNotFoundResponse()
  @Put('/:id')
  update(@Param('id') id: string, @Body() updateExpertDTO: UpdateExpertDTOImp) {
    return this.service.update(id, updateExpertDTO);
  }

  @ApiOkResponse({ type: Expert })
  @ApiNotFoundResponse()
  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
