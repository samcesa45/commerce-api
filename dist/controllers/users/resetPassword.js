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
const express_1 = __importDefault(require("express"));
const forgotPassword_1 = __importDefault(require("../../models/forgotPassword"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../../models/user"));
const resetPasswordRouter = express_1.default.Router();
resetPasswordRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, newPassword } = req.body;
    const user = yield user_1.default.findOne({ email });
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    const resetEntry = yield forgotPassword_1.default.findOne({ userId: user._id, expiresAt: { $gt: Date.now() } });
    if (!resetEntry) {
        return res.status(400).json({ error: "Invalid email or otp" });
    }
    //Hash the new password and save it to the User collection
    const hashedPassword = yield bcrypt_1.default.hash(newPassword, parseInt(process.env.SALT_ROUNDS));
    user.passwordHash = hashedPassword;
    yield user.save();
    yield forgotPassword_1.default.deleteOne({ _id: resetEntry._id });
    res.status(200).json({ message: 'Password has been reset successfully' });
}));
exports.default = resetPasswordRouter;
