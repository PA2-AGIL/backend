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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetUser } from 'src/auth/get-user.decorator';
import { Answer } from 'src/database/entities/answer/answer';
import { User } from 'src/database/entities/user';
import { PaginationDTO } from 'src/utils/pagination/dto/paginationDTO';
import { AnswerService } from './answer.service';
import { CreateAnswerDTOImp } from './dto/createAnswerDTO';
import { UpdateAnswerDTOImp } from './dto/updateAnswerDTO';

@Controller('answer')
@ApiTags('answer')
export class AnswerController {
  constructor(private readonly service: AnswerService) {}

  @Get('/all')
  getAllAnswers(
    @Query('query') query: string,
    @Query() paginationDTO: PaginationDTO,
  ) {
    paginationDTO.limit = Number(paginationDTO.limit);
    paginationDTO.page = Number(paginationDTO.page);

    return this.service.getAnswers(query, paginationDTO);
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
  @UseGuards(AuthGuard())
  create(
    @Body() createAnswerDto: CreateAnswerDTOImp,
    @Param('questionId') questionId: string,
    @GetUser() user: User,
  ) {
    return this.service.create(createAnswerDto, questionId, user);
  }

  @ApiCreatedResponse({ type: Answer })
  @ApiNotFoundResponse()
  @Put('/:id')
  @UseGuards(AuthGuard())
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateAnswerDTO: UpdateAnswerDTOImp,
  ) {
    return this.service.update(id, updateAnswerDTO);
  }

  @ApiOkResponse({ type: Answer })
  @ApiNotFoundResponse()
  @Delete('/:id')
  @UseGuards(AuthGuard())
  delete(@Param('id', ParseIntPipe) id: string) {
    return this.service.delete(id);
  }
}
