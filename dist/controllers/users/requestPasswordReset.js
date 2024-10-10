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
const forgotPassword_1 = __importDefault(require("../../models/forgotPassword"));
const express_1 = __importDefault(require("express"));
const sendMail_1 = __importDefault(require("../../utils/sendMail"));
const user_1 = __importDefault(require("../../models/user"));
const crypto_1 = __importDefault(require("crypto"));
const requestResetPasswordRouter = express_1.default.Router();
requestResetPasswordRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const user = yield user_1.default.findOne({ email });
    if (!user) {
        return res.status(400).json({ error: "User not found" });
    }
    //Generate a reset token
    const resetToken = crypto_1.default.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600;
    const passwordToken = yield forgotPassword_1.default.create({
        userId: user._id,
        token: resetToken,
        createdAt: resetTokenExpiry
    });
    yield passwordToken.save();
    const link = `${process.env.BASE_URL}/api/request-reset/${passwordToken.userId}/${passwordToken.token}`;
    yield (0, sendMail_1.default)(user.email, "Password Reset", link);
    res.status(200).json({ message: "Password reset link sent to your email account" });
}));
exports.default = requestResetPasswordRouter;
