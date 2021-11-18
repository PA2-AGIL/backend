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
import { CreateQuestionDTOImp } from './dto/createQuestionDTO';
import { UpdateQuestionDTOImp } from './dto/updateQuestionDTOImp';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  constructor(private readonly service: QuestionService) {}

  @Get()
  getQuestions() {
    return this.service.getQuestions();
  }

  @Get('/:id')
  getByID(@Param('id', ParseIntPipe) id: number) {
    return this.service.getByID(id);
  }

  @Post()
  create(@Body() createQuestion: CreateQuestionDTOImp) {
    return this.service.create(createQuestion);
  }

  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateQuestion: UpdateQuestionDTOImp,
  ) {
    return this.service.update(id, updateQuestion);
  }

  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
