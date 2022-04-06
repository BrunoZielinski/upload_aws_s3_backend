"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileFilter = exports.storageTypes = void 0;
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const path_1 = require("path");
const crypto_1 = __importDefault(require("crypto"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const storageTypes = (type, folder) => {
    if (type === 'local') {
        return multer_1.default.diskStorage({
            destination: (0, path_1.resolve)(__dirname, '..', '..', folder),
            filename: (req, file, callback) => {
                const fileHash = crypto_1.default.randomBytes(10).toString('hex');
                const fileName = `${fileHash}-${file.originalname}`;
                callback(null, fileName);
            }
        });
    }
    else {
        return (0, multer_s3_1.default)({
            s3: new aws_sdk_1.default.S3(),
            bucket: process.env.BUCKET_NAME,
            contentType: multer_s3_1.default.AUTO_CONTENT_TYPE,
            acl: 'public-read',
            key: (req, file, callback) => {
                const fileHash = crypto_1.default.randomBytes(16).toString('hex');
                const fileName = `${fileHash}-${file.originalname}`;
                callback(null, `${folder}/` + fileName);
            }
        });
    }
};
exports.storageTypes = storageTypes;
// export const fileStorage = (folder: string) =>
//   multer.diskStorage({
//     destination: resolve(__dirname, '..', '..', folder),
//     filename: (req, file, callback) => {
//       const fileHash = crypto.randomBytes(10).toString('hex')
//       const fileName = `${fileHash}-${file.originalname}`
//       callback(null, fileName)
//     }
//   })
const fileFilter = (req, file, callback) => {
    const allowedMimes = [
        'image/jpeg',
        'image/pjpeg',
        'image/png',
        'application/pdf'
    ];
    if (allowedMimes.includes(file.mimetype)) {
        return callback(null, true);
    }
    return callback(new Error('Invalid file type.'));
};
exports.fileFilter = fileFilter;
