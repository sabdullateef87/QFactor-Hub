"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseException extends Error {
    constructor(message, httpCode, status) {
        super();
        this.message = message;
        this.httpCode = httpCode;
        this.status = status;
        this.httpCode = httpCode;
        this.status = status;
        this.message = message;
    }
}
exports.default = BaseException;
