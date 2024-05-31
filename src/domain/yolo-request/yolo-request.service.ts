import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class YoloRequestService {
  constructor(private readonly httpService: HttpService) {}

  async getYoloResult(imageUrl: string): Promise<any> {
    const apiUrl = `http://13.124.185.96:8001/api/yolo/yolo-from-url?image_url=${imageUrl}`;
    const headersRequest = {
      accept: 'application/json',
    };

    const response = await firstValueFrom(
      this.httpService.post(apiUrl, null, { headers: headersRequest }),
    );

    return response.data;
  }
}
