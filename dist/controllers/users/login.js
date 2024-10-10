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
const user_1 = __importDefault(require("../../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_1 = __importDefault(require("express"));
const loginRouter = express_1.default.Router();
const TOKEN_EXPIRY = 60 * 60;
loginRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_1.default.findOne({ email });
    if (!user) {
        return res.status(401).json({ error: 'User not found' });
    }
    const passwordCorrect = yield bcrypt_1.default.compare(password, user.passwordHash);
    if (!passwordCorrect) {
        return res.status(401).json({ error: 'invalid email or password' });
    }
    const userToken = {
        email: user.email,
        id: user._id,
    };
    const token = jsonwebtoken_1.default.sign(userToken, process.env.SECRET, {
        expiresIn: TOKEN_EXPIRY,
    });
    res.status(200).json({ token, email: user.email, message: 'Login successful' });
}));
exports.default = loginRouter;
