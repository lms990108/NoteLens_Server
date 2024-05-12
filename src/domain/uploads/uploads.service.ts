import {
  UseInterceptors,
  UploadedFile,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import * as AWS from 'aws-sdk';
import {
  BucketNotFoundException,
  InternalServerErrorException,
} from './uploads.exception';

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
      console.error('Upload Error:', error);
      // 에러에 따라 적절한 HTTP 상태 코드 반환
      if (
        error.code === 'InvalidAccessKeyId' ||
        error.code === 'SignatureDoesNotMatch'
      ) {
        throw new UnauthorizedException();
      } else if (error.statusCode === 403) {
        throw new ForbiddenException();
      } else if (error.statusCode === 404) {
        throw new BucketNotFoundException();
      } else if (error.statusCode === 400) {
        throw new BadRequestException();
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
