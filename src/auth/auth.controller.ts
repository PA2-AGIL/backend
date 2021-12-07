import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Expert } from 'src/database/entities/expert/expert';
import { Producer } from 'src/database/entities/producer/producer';
import { CreateExpertDTOImp } from 'src/presentation/expert/dtos/createExpertDTO';
import { CreateProducerDTOImp } from 'src/presentation/producer/dtos/createProducerDTO';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/signInDTO';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @ApiCreatedResponse({ type: Expert })
  @Post('/signup/expert')
  @UseInterceptors(FileInterceptor('profilePicture'))
  signUpExpert(
    @Body() createExpertDTO: CreateExpertDTOImp,
    @UploadedFile() profilePicture: Express.Multer.File,
  ) {
    return this.service.singUpExpert(createExpertDTO, profilePicture);
  }

  @Post('/signin/expert')
  signInExpert(@Body() signInDTO: SignInDTO) {
    return this.service.signInExpert(signInDTO);
  }

  @ApiCreatedResponse({ type: Producer })
  @Post('/signup/producer')
  @UseInterceptors(FileInterceptor('profilePicture'))
  signUpProducer(
    @Body() createProducerDTO: CreateProducerDTOImp,
    @UploadedFile() profilePicture: Express.Multer.File,
  ) {
    return this.service.signUpProducer(createProducerDTO, profilePicture);
  }
}
