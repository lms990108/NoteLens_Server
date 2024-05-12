import { HttpException } from '@nestjs/common';
import { IBaseException } from './base.exception.interface';
export declare class BaseException extends HttpException implements IBaseException {
    constructor(errorCode: string, statusCode: number);
    errorCode: string;
    statusCode: number;
    timestamp: string;
    path: string;
}
