import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type QuestionDocument = Question & Document;

@Schema()
export class Question extends Document {
  @Prop({ required: true })
  image_url: string;

  @Prop({ required: true, type: mongoose.Schema.Types.Mixed }) // JSON 데이터를 위해 Mixed 타입 사용
  content: any;

  @Prop({ required: true })
  subject: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
