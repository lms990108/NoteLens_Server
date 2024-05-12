import { HttpException } from '@nestjs/common';
import { IBaseException } from './base.exception.interface';
import { ApiProperty } from '@nestjs/swagger';

export class BaseException extends HttpException implements IBaseException {
  constructor(errorCode: string, statusCode: number) {
    super(errorCode, statusCode);
    this.errorCode = errorCode;
    this.statusCode = statusCode;
  }

  @ApiProperty()
  errorCode: string;

  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  timestamp: string;

  @ApiProperty()
  path: string;
}
