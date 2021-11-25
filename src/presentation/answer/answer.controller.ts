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
import { AnswerService } from './answer.service';
import { CreateAnswerDTOImp } from './dto/createAnswerDTO';
import { UpdateAnswerDTOImp } from './dto/updateAnswerDTO';

@Controller('answer')
export class AnswerController {
  constructor(private readonly service: AnswerService) {}

  @Get()
  getAnswers() {
    return this.service.getAnswers();
  }

  @Get('/:id')
  getByID(@Param('id', ParseIntPipe) id: number) {
    return this.service.getByID(id);
  }

  @Post('/:questionId')
  create(
    @Body() createAnswerDTO: CreateAnswerDTOImp,
    @Param('questionId', ParseIntPipe) questionId: number,
  ) {
    return this.service.create(createAnswerDTO, questionId);
  }

  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAnswerDTO: UpdateAnswerDTOImp,
  ) {
    return this.service.update(id, updateAnswerDTO);
  }

  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
