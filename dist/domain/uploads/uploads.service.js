"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const platform_express_1 = require("@nestjs/platform-express");
const AWS = require("aws-sdk");
const uploads_exception_1 = require("./uploads.exception");
let UploadsService = class UploadsService {
    constructor(configService) {
        this.configService = configService;
    }
    async uploadFile(file) {
        const ACCESS_KEY = this.configService.get('AWS_ACCESS_KEY');
        const SECRET_KEY = this.configService.get('AWS_SECRET_KEY');
        const BUCKET_NAME = this.configService.get('BUCKET_NAME');
        const s3 = new AWS.S3({
            accessKeyId: ACCESS_KEY,
            secretAccessKey: SECRET_KEY,
        });
        const date = new Date().getTime();
        try {
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
        }
        catch (error) {
            console.error('Upload Error:', error);
            if (error.code === 'InvalidAccessKeyId' ||
                error.code === 'SignatureDoesNotMatch') {
                throw new common_1.UnauthorizedException();
            }
            else if (error.statusCode === 403) {
                throw new common_1.ForbiddenException();
            }
            else if (error.statusCode === 404) {
                throw new uploads_exception_1.BucketNotFoundException();
            }
            else if (error.statusCode === 400) {
                throw new common_1.BadRequestException();
            }
            else {
                throw new uploads_exception_1.InternalServerErrorException();
            }
        }
    }
};
exports.UploadsService = UploadsService;
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploadsService.prototype, "uploadFile", null);
exports.UploadsService = UploadsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], UploadsService);
//# sourceMappingURL=uploads.service.js.map