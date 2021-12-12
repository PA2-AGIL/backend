import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetUser } from 'src/auth/get-user.decorator';
import { Question } from 'src/database/entities/question/question';
import { CreateQuestionDTOImp } from './dto/createQuestionDTO';
import { UpdateQuestionDTOImp } from './dto/updateQuestionDTO';
import { QuestionService } from './question.service';

@Controller('question')
@ApiTags('question')
export class QuestionController {
  constructor(private readonly service: QuestionService) {}

  @ApiOkResponse({ type: Question, isArray: true })
  @Get()
  getQuestions(@Query('page') page = 1, @Query('limit') limit = 10) {
    limit = limit > 100 ? 100 : limit;
    return this.service.paginate({ page, limit });
  }

  @ApiOkResponse({ type: Question })
  @ApiNotFoundResponse()
  @Get('/:id')
  getByID(@Param('id') id: string) {
    return this.service.getByID(id);
  }

  @ApiCreatedResponse({ type: Question })
  @ApiNotFoundResponse()
  @Post('/:ownerId')
  @UseGuards(AuthGuard())
  @UseInterceptors(FilesInterceptor('files'))
  create(
    @Body() createQuestion: CreateQuestionDTOImp,
    @UploadedFiles() files: Express.Multer.File[],
    @Param('ownerId') ownerId: string,
    @GetUser() user,
  ) {
    console.log(user);
    return this.service.create(createQuestion, files, ownerId);
  }

  @ApiCreatedResponse({ type: Question })
  @ApiNotFoundResponse()
  @Put('/:id')
  @UseGuards(AuthGuard())
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateQuestion: UpdateQuestionDTOImp,
  ) {
    return this.service.update(id, updateQuestion);
  }

  @ApiOkResponse({ type: Question })
  @ApiNotFoundResponse()
  @Delete('/:id')
  @UseGuards(AuthGuard())
  delete(@Param('id', ParseIntPipe) id: string) {
    return this.service.delete(id);
  }

  @Get('/all')
  getAllQuestions() {
    return this.service.getQuestions();
  }
}
