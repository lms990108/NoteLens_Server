import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import * as mongoose from 'mongoose';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Swagger 문서 설정
  const config = new DocumentBuilder()
    .setTitle('Example API')
    .setDescription('API documentation for the example application.')
    .setVersion('1.0')
    // .addBearerAuth() // JWT 인증이 필요한 경우 이 옵션을 추가
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  mongoose.set('debug', true);

  // 포트 설정 및 애플리케이션 리스닝 시작
  const port = configService.get<number>('PORT', 3000);
  await app.listen(port);
  console.log(`Application is running on port ${port}`);
}

bootstrap();
