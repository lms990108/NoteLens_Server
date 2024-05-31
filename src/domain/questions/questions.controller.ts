import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new question' })
  @ApiResponse({
    status: 201,
    description: 'The question has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.createQuestion(createQuestionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all questions' })
  @ApiResponse({
    status: 200,
    description: 'All questions returned',
    type: [CreateQuestionDto],
  })
  findAll() {
    return this.questionsService.findAllQuestions();
  }

  @Post('yolo')
  @ApiOperation({ summary: 'Create a new question with YOLO response' })
  @ApiResponse({
    status: 201,
    description:
      'The question has been successfully created with YOLO response.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  createWithYolo(
    @Query('imageUrl') imageUrl: string,
    @Query('subject') subject: string,
  ) {
    return this.questionsService.getYoloAndCreateQuestion(imageUrl, subject);
  }
}
