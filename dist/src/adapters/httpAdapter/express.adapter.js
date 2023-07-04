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
const response_dto_1 = __importDefault(require("../../dtos/response.dto"));
const BaseException_1 = __importDefault(require("../../exceptions/BaseException"));
const ExpressAdapter = (fn) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const object = yield fn(req, res);
    if (object instanceof response_dto_1.default) {
        const code = object.httpCode;
        return res.status(code).json(object);
    }
    else if (object instanceof BaseException_1.default) {
        const httpErrorCode = object.httpCode;
        return res.status(httpErrorCode).json(object);
    }
    else {
        return res.json(object);
    }
});
exports.default = ExpressAdapter;
