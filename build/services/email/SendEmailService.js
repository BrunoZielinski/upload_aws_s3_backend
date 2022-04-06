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
exports.SendEmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
class SendEmailService {
    execute({ emailAddress }) {
        return __awaiter(this, void 0, void 0, function* () {
            let transporter = nodemailer_1.default.createTransport({
                name: 'hostgator',
                host: 'mail.matratecnologia.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'noreply@matratecnologia.com',
                    pass: 'i%G[CG[LFq.='
                }
            });
            yield transporter.sendMail({
                from: '<noreply@matratecnologia.com>',
                to: emailAddress,
                subject: 'E-mail de teste!! ✔',
                text: 'E-mail enviado do nodejs como teste!',
                html: '<b>E-mail enviado do nodejs como teste!</b>'
            });
            return { ok: true };
        });
    }
}
exports.SendEmailService = SendEmailService;
