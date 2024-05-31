import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { YoloRequestService } from './yolo-request.service';
import { YoloRequestController } from './yolo-request.controller';

@Module({
  imports: [HttpModule],
  providers: [YoloRequestService],
  controllers: [YoloRequestController],
})
export class YoloRequestModule {}
