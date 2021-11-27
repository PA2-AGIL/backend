import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
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

  @Post('/:ownerId')
  @UseInterceptors(FilesInterceptor('files'))
  create(
    @Body() createQuestion: CreateQuestionDTOImp,
    @UploadedFiles() files: Express.Multer.File[],
    @Param('ownerId', ParseIntPipe) ownerId: number,
  ) {
    return this.service.create(createQuestion, files, ownerId);
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
