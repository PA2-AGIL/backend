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
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Answer } from 'src/database/entities/answer/answer';
import { AnswerService } from './answer.service';
import { CreateAnswerDTOImp } from './dto/createAnswerDTO';
import { UpdateAnswerDTOImp } from './dto/updateAnswerDTO';

@Controller('answer')
@ApiTags('answer')
export class AnswerController {
  constructor(private readonly service: AnswerService) {}

  @ApiOkResponse({ type: Answer, isArray: true })
  @Get()
  getAnswers() {
    return this.service.getAnswers();
  }

  @ApiOkResponse({ type: Answer })
  @ApiNotFoundResponse()
  @Get('/:id')
  getByID(@Param('id') id: string) {
    return this.service.getByID(id);
  }

  @ApiCreatedResponse({ type: Answer })
  @ApiNotFoundResponse()
  @Post('/:questionId')
  create(
    @Body() createAnswerDTO: CreateAnswerDTOImp,
    @Param('questionId') questionId: string,
  ) {
    return this.service.create(createAnswerDTO, questionId);
  }

  @ApiCreatedResponse({ type: Answer })
  @ApiNotFoundResponse()
  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateAnswerDTO: UpdateAnswerDTOImp,
  ) {
    return this.service.update(id, updateAnswerDTO);
  }

  @ApiOkResponse({ type: Answer })
  @ApiNotFoundResponse()
  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: string) {
    return this.service.delete(id);
  }
}
