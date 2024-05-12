import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { UploadsService } from './uploads.service';

export class FileUploadDto {
  @ApiProperty({ type: 'file' })
  file: any;
}

@ApiTags('uploads')
@Controller('uploads')
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
    type: 'application/json', // 응답 타입 명시
  })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  @ApiResponse({ status: 403, description: '접근 금지' })
  @ApiResponse({ status: 404, description: '버킷을 찾을 수 없음' })
  @ApiResponse({ status: 500, description: '서버 내부 오류' })
  @ApiResponse({ status: 401, description: '인증 실패' })
  uploadFile(@UploadedFile() file) {
    console.log(file);
    return this.uploadService.uploadFile(file);
  }
}
