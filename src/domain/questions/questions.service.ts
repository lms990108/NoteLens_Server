import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question, QuestionDocument } from './schemas/question.schema'; // 수정된 임포트

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>, // 수정된 주입
  ) {}

  async createQuestion(createQuestionDto: any): Promise<Question> {
    const newQuestion = new this.questionModel(createQuestionDto);
    return newQuestion.save();
  }

  async findAllQuestions(): Promise<Question[]> {
    return this.questionModel.find().exec();
  }
}
