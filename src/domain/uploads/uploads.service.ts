import { UseInterceptors, UploadedFile, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import * as AWS from 'aws-sdk';

@Injectable()
export class UploadsService {
  constructor(private readonly configService: ConfigService) {}

  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    const ACCESS_KEY = this.configService.get('AWS_ACCESS_KEY');
    const SECRET_KEY = this.configService.get('AWS_SECRET_KEY');
    const BUCKET_NAME = this.configService.get('BUCKET_NAME');

    const s3 = new AWS.S3({
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_KEY,
    });
    const date = new Date().getTime();

    try {
      // 파일 업로드 처리
      const result = await s3
        .upload({
          Bucket: BUCKET_NAME,
          Key: `image/${date + file.originalname}`,
          Body: file.buffer,
          ACL: 'public-read',
        })
        .promise();

      console.log(result);
      return result.Location;
    } catch (error) {
      console.error(error);
    }
  }
}
