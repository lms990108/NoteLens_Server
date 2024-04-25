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
  uploadFile(@UploadedFile() file) {
    console.log(file);
    return this.uploadService.uploadFile(file);
  }
}
