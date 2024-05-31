import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QuestionsModule } from './domain/questions/questions.module';
import { UploadsModule } from './domain/uploads/uploads.module';
import { GptModule } from './domain/gpt/gpt.module';
import { YoloRequestModule } from './domain/yolo-request/yolo-request.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UploadsModule,
    QuestionsModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_DB_PATH'),
      }),
    }),
    GptModule,
    YoloRequestModule,
  ],
})
export class AppModule {}
