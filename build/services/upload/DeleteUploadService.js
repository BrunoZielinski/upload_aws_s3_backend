"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUploadService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const path_1 = require("path");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const fs_1 = __importDefault(require("fs"));
const s3 = new aws_sdk_1.default.S3();
class DeleteUploadService {
    execute({ uploadId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const upload = yield prisma_1.default.photo.delete({
                where: {
                    id: uploadId
                }
            });
            if (process.env.STORAGE_TYPE === 's3') {
                const params = {
                    Bucket: process.env.BUCKET_NAME,
                    Key: upload.key
                };
                s3.deleteObject(params, (err, data) => { });
            }
            else {
                const filePath = (0, path_1.resolve)(__dirname, '..', '..', '..', 'tmp', 'uploads', upload.key);
                fs_1.default.unlink(filePath, err => { });
            }
            return upload;
        });
    }
}
exports.DeleteUploadService = DeleteUploadService;
