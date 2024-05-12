import { HttpStatus } from '@nestjs/common';
import { BaseException } from 'src/common/error/base.exception';
import { UploadExceptionCodeEnum } from './uploads.exception.enum';

export class UnauthorizedIdException extends BaseException {
  constructor() {
    super(UploadExceptionCodeEnum.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
  }
}

export class ForbiddenException extends BaseException {
  constructor() {
    super(UploadExceptionCodeEnum.FORBIDDEN, HttpStatus.FORBIDDEN);
  }
}

export class BucketNotFoundException extends BaseException {
  constructor() {
    super(UploadExceptionCodeEnum.BUCKET_NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}

export class BadRequestException extends BaseException {
  constructor() {
    super(UploadExceptionCodeEnum.BAD_REQUEST, HttpStatus.BAD_REQUEST);
  }
}

export class InternalServerErrorException extends BaseException {
  constructor() {
    super(
      UploadExceptionCodeEnum.INTERNAL_SERVER_ERROR,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
