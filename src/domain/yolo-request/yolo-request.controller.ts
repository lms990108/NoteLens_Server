import { Controller, Get, Query } from '@nestjs/common';
import { YoloRequestService } from './yolo-request.service';

@Controller('yolo-request')
export class YoloRequestController {
  constructor(private readonly yoloRequestService: YoloRequestService) {}

  @Get('process')
  async processImage(@Query('imageUrl') imageUrl: string): Promise<any> {
    return this.yoloRequestService.getYoloResult(imageUrl);
  }
}
