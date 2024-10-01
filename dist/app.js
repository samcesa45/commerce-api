"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("./utils/logger"));
const config_1 = __importDefault(require("./utils/config"));
const signup_1 = __importDefault(require("./controllers/users/signup"));
const login_1 = __importDefault(require("./controllers/users/login"));
mongoose_1.default.set('strictQuery', false);
logger_1.default.info('connecting to', config_1.default.MONGODB_URI);
mongoose_1.default
    .connect(config_1.default.MONGODB_URI)
    .then(() => {
    logger_1.default.info('connected to MongoDB');
})
    .catch((error) => {
    logger_1.default.error('error connecting to MongoDB', error.message);
});
app.use((0, cors_1.default)());
app.use(express_1.default.static('dist'));
app.use(express_1.default.json());
app.use("/api/signup", signup_1.default);
app.use('/api/login', login_1.default);
exports.default = app;
