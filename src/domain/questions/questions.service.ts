import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question, QuestionDocument } from './schemas/question.schema'; // 수정된 임포트
import { CreateQuestionDto } from './dto/create-question.dto'; // 추가된 임포트
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
    private readonly httpService: HttpService,
  ) {}

  async createQuestion(createQuestionDto: any): Promise<Question> {
    const newQuestion = new this.questionModel(createQuestionDto);
    return newQuestion.save();
  }

  async findAllQuestions(): Promise<Question[]> {
    return this.questionModel.find().exec();
  }

  async getYoloAndCreateQuestion(
    imageUrl: string,
    subject: string,
  ): Promise<Question> {
    const apiUrl = `http://13.124.185.96:8001/api/yolo/yolo-from-url?image_url=${imageUrl}`;
    const headersRequest = {
      accept: 'application/json',
    };

    const response = await firstValueFrom(
      this.httpService.post(apiUrl, null, { headers: headersRequest }),
    );

    const createQuestionDto: CreateQuestionDto = {
      image_url: imageUrl,
      content: response.data,
      subject: subject,
    };

    return this.createQuestion(createQuestionDto);
  }
}
