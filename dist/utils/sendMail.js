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
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("./config"));
const sendMail = (email, subject, otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transporter = nodemailer_1.default.createTransport({
            host: config_1.default.HOST,
            port: 2525,
            auth: {
                user: config_1.default.USER_NAME,
                pass: config_1.default.USER_PASS
            },
        });
        const mailOptions = {
            from: config_1.default.SENDER_EMAIL,
            to: email,
            subject: subject,
            html: `
            <h3>Password Reset Request</h3>
            <p>Your OTP for password reset is: <strong>${otp}</strong></p>
            <p>Please enter this OTP to reset your password.</p>
            <p>If you didn't request this, please ignore this email.</p>
        `
        };
        yield transporter.sendMail(mailOptions);
        console.log("Your email has been sent successfully");
    }
    catch (error) {
        console.error(error, "email not sent");
    }
});
exports.default = sendMail;
