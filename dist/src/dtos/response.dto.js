"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MWResponse {
    constructor(message, httpCode, data) {
        this.message = message;
        this.httpCode = httpCode;
        this.data = data;
    }
}
exports.default = MWResponse;
