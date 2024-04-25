import { UseInterceptors, UploadedFile, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import AWS from 'aws-sdk';

@Injectable()
export class UploadsService {
  constructor(private readonly configService: ConfigService) {}

  ACCESS_KEY = this.configService.get('AWS_ACCESS_KEY');
  SECRET_KEY = this.configService.get('AWS_SECRET_KEY');
  BUCKET_NAME = this.configService.get('BUCKET_NAME');

  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    AWS.config.update({
      credentials: {
        accessKeyId: this.ACCESS_KEY,
        secretAccessKey: this.SECRET_KEY,
      },
    });

    const s3 = new AWS.S3();

    try {
      // 파일 업로드 처리
      const result = await s3
        .upload({
          Bucket: this.BUCKET_NAME, // 기존에 만들어져 있는 S3 버킷 이름
          Key: file.originalname, // 저장될 파일 이름 (원본 파일 이름 사용)
          Body: file.buffer, // 파일 데이터
          ACL: 'public-read', // 파일 접근 권한 (필요에 따라 설정)
        })
        .promise();

      console.log(result);
      return result;
    } catch (error) {
      console.error(error); // 에러 처리
    }
  }
}
