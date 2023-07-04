"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const jwtSecret = config_1.default.get("JWT_SECRET");
const generateToken = (payload, options = {}) => {
    return jsonwebtoken_1.default.sign(payload, jwtSecret, options);
};
exports.generateToken = generateToken;
const verifyToken = (token, jwtSecret, SignOptions = {}) => {
    return jsonwebtoken_1.default.verify(token, jwtSecret, SignOptions);
};
exports.verifyToken = verifyToken;
