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
  @UseInterceptors(FileInterceptor('profilePicture'))
  create(
    @Body() createExpertDTO: CreateExpertDTOImp,
    @UploadedFile() profilePicture: Express.Multer.File,
  ) {
    return this.service.create(createExpertDTO, profilePicture);
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
