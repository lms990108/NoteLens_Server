import { UploadsService } from './uploads.service';
export declare class FileUploadDto {
    file: any;
}
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadsService);
    uploadFile(file: any): Promise<string>;
}
