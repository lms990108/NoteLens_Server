import { Controller, Get, Post, Body } from '@nestjs/common';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  create(@Body() createQuestionDto: any) {
    return this.questionsService.createQuestion(createQuestionDto);
  }

  @Get()
  findAll() {
    return this.questionsService.findAllQuestions();
  }
}
