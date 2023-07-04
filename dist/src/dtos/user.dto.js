"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPasswordSchema = exports.createUserSchema = exports.loginUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.loginUserSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(8).required(),
});
exports.createUserSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(8).required(),
});
exports.forgotPasswordSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    newPassword: joi_1.default.string().min(8).required(),
    confirmNewPassword: joi_1.default.string().min(8).required()
});
