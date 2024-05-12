"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerErrorException = exports.BadRequestException = exports.BucketNotFoundException = exports.ForbiddenException = exports.UnauthorizedIdException = void 0;
const common_1 = require("@nestjs/common");
const base_exception_1 = require("../../common/error/base.exception");
const uploads_exception_enum_1 = require("./uploads.exception.enum");
class UnauthorizedIdException extends base_exception_1.BaseException {
    constructor() {
        super(uploads_exception_enum_1.UploadExceptionCodeEnum.UNAUTHORIZED, common_1.HttpStatus.UNAUTHORIZED);
    }
}
exports.UnauthorizedIdException = UnauthorizedIdException;
class ForbiddenException extends base_exception_1.BaseException {
    constructor() {
        super(uploads_exception_enum_1.UploadExceptionCodeEnum.FORBIDDEN, common_1.HttpStatus.FORBIDDEN);
    }
}
exports.ForbiddenException = ForbiddenException;
class BucketNotFoundException extends base_exception_1.BaseException {
    constructor() {
        super(uploads_exception_enum_1.UploadExceptionCodeEnum.BUCKET_NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
    }
}
exports.BucketNotFoundException = BucketNotFoundException;
class BadRequestException extends base_exception_1.BaseException {
    constructor() {
        super(uploads_exception_enum_1.UploadExceptionCodeEnum.BAD_REQUEST, common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.BadRequestException = BadRequestException;
class InternalServerErrorException extends base_exception_1.BaseException {
    constructor() {
        super(uploads_exception_enum_1.UploadExceptionCodeEnum.INTERNAL_SERVER_ERROR, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
exports.InternalServerErrorException = InternalServerErrorException;
//# sourceMappingURL=uploads.exception.js.map