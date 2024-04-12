import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000); // 'PORT' 값이 없을 경우 기본값으로 3000을 사용
  await app.listen(port);
  console.log(`Application is running on port ${port}`);
}

bootstrap();
