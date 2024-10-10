"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const USER_NAME = process.env.USER_NAME;
const USER_PASS = process.env.PASS;
const HOST = process.env.HOST;
const SENDER_EMAIL = process.env.SENDER_EMAIL;
exports.default = {
    PORT,
    MONGODB_URI,
    USER_NAME,
    USER_PASS,
    SENDER_EMAIL,
    HOST
};
