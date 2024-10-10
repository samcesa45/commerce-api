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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const mailtrap_1 = require("mailtrap");
const client = new mailtrap_1.MailtrapClient({ token: (_a = process.env.TOKEN) !== null && _a !== void 0 ? _a : "" });
const sendMailTrapMail = (email, subject, text) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const sender = { name: subject, email: (_a = process.env.SENDER_EMAIL) !== null && _a !== void 0 ? _a : "" };
    try {
        const message = yield client.send({
            from: sender,
            to: [{ email: email }],
            subject: subject,
            text: text
        });
        return console.log(message);
    }
    catch (message_1) {
        return console.error(message_1);
    }
});
exports.default = sendMailTrapMail;
