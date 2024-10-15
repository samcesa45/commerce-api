"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateResetCode = void 0;
const generateResetCode = () => {
    return Math.floor(10000 + Math.random() * 90000);
};
exports.generateResetCode = generateResetCode;
