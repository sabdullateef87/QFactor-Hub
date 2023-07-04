"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.path = exports.logger = void 0;
const winston_1 = require("winston");
const path_1 = __importDefault(require("path"));
exports.path = path_1.default;
const logger = (filename) => (0, winston_1.createLogger)({
    transports: [new winston_1.transports.Console()],
    format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.timestamp(), winston_1.format.json(), winston_1.format.printf(({ timestamp, level, message, service }) => {
        return `[${timestamp}] - [ path : ${service} ] - ${level}: ${message}`;
    })),
    defaultMeta: {
        service: filename === (null || undefined) ? "" : filename,
    },
});
exports.logger = logger;
