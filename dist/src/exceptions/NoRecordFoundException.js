"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NoRecordFoundException extends Error {
    constructor(message, code, status) {
        super();
        this.message = message;
        this.code = code;
        this.status = status;
        this.code = code;
        this.status = status;
        this.message = message;
    }
}
exports.default = NoRecordFoundException;
