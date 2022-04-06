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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUploadController = void 0;
const CreateUploadService_1 = require("../../services/upload/CreateUploadService");
class CreateUploadController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.file) {
                throw new Error('Missing file');
            }
            else {
                if (process.env.STORAGE_TYPE === 'local') {
                    const { originalname: name, filename: key, size } = req.file;
                    const service = new CreateUploadService_1.CreateUploadService();
                    const upload = yield service.execute({
                        name,
                        key,
                        url: `${process.env.APP_URL}:${process.env.SERVER_PORT}/uploads/${key}`,
                        size
                    });
                    return res.json(upload);
                }
                else {
                    const { originalname: name, key, location: url, size } = req.file;
                    const service = new CreateUploadService_1.CreateUploadService();
                    const upload = yield service.execute({
                        name,
                        key,
                        url,
                        size
                    });
                    return res.json(upload);
                }
            }
        });
    }
}
exports.CreateUploadController = CreateUploadController;
