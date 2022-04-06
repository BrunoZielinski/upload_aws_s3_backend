"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
// --- CONTROLLERS UPLOAD ---
const CreateUploadController_1 = require("./controllers/upload/CreateUploadController");
const ListUploadController_1 = require("./controllers/upload/ListUploadController");
const DeleteUploadController_1 = require("./controllers/upload/DeleteUploadController");
// --- CONTROLLERS EMAIL ---
const SendEmailController_1 = require("./controllers/email/SendEmailController");
// --- SERVICES UPLOAD ---
const multer_2 = require("./config/multer");
const router = (0, express_1.Router)();
exports.router = router;
// --- CONNECTION TEST ---
router.get('/ping', (req, res) => {
    return res.json({ pong: true });
});
// --- ROUTERS UPLOAD ---
router.get('/uploads', new ListUploadController_1.ListUploadController().handle);
router.post('/uploads', (0, multer_1.default)({
    storage: (0, multer_2.storageTypes)(process.env.STORAGE_TYPE === 'local' ? 'local' : 's3', 'uploads'),
    fileFilter: multer_2.fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }
}).single('file'), new CreateUploadController_1.CreateUploadController().handle);
router.delete('/upload/remove', new DeleteUploadController_1.DeleteUploadController().handle);
// --- ROUTERS EMAIL ---
router.post('/email/send', new SendEmailController_1.SendEmailController().handle);
