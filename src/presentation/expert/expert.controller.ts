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
import { Expert } from 'src/database/entities/expert/expert';
import { UpdateExpertDTOImp } from './dtos/updateExpertDTO';
import { ExpertService } from './expert.service';

@Controller('expert')
@ApiTags('expert')
export class ExpertController {
  constructor(private readonly service: ExpertService) {}

  @ApiOkResponse({ type: Expert, isArray: true })
  @Get()
  getExperts(@Query('page') page = 1, @Query('limit') limit = 10) {
    limit = limit > 100 ? 100 : limit;
    return this.service.paginate({ page, limit });
  }

  @ApiOkResponse({ type: Expert })
  @ApiNotFoundResponse()
  @Get('/:id')
  getByID(@Param('id') id: string) {
    return this.service.getByID(id);
  }

  @ApiCreatedResponse({ type: Expert })
  @ApiNotFoundResponse()
  @Put('/:id')
  @UseGuards(AuthGuard())
  update(@Param('id') id: string, @Body() updateExpertDTO: UpdateExpertDTOImp) {
    return this.service.update(id, updateExpertDTO);
  }

  @ApiOkResponse({ type: Expert })
  @ApiNotFoundResponse()
  @Delete('/:id')
  @UseGuards(AuthGuard())
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }

  @Get('/all')
  getAllExperts() {
    return this.service.getExperts();
  }
}
