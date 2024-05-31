import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { QuestionSchema } from './schemas/question.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Question', schema: QuestionSchema }]),
    HttpModule,
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
