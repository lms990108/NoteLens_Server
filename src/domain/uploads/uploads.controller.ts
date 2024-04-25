import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import AWS from 'aws-sdk';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiProperty,
} from '@nestjs/swagger';
import { UploadsService } from './uploads.service';
import { application } from 'express';
import { json } from 'stream/consumers';

export class FileUploadDto {
  @ApiProperty({ type: 'file' })
  file: any;
}

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadsService) {}

  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'image upload',
    type: FileUploadDto,
  })
  @ApiOperation({ summary: '이미지 업로드' })
  @ApiResponse({
    status: 200,
    description: '이미지 업로드 성공',
  })
  uploadFile(@UploadedFile() file) {
    console.log(file);
    return this.uploadService.uploadFile(file);
  }
}
