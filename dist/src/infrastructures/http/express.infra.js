"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_router_1 = __importDefault(require("../routers/express.router"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
exports.app = app;
app.use((0, morgan_1.default)('combined'));
app.use(body_parser_1.default.json());
app.use("/user", express_router_1.default);
