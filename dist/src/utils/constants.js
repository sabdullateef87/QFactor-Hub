"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseMessage = exports.ResponseCode = exports.HttpResponseCode = exports.Status = void 0;
var Status;
(function (Status) {
    Status["FAILURE"] = "FAILURE";
    Status["SUCCESS"] = "SUCCESS";
})(Status = exports.Status || (exports.Status = {}));
var HttpResponseCode;
(function (HttpResponseCode) {
    HttpResponseCode[HttpResponseCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpResponseCode[HttpResponseCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpResponseCode[HttpResponseCode["DUPLICATE_RECORD"] = 409] = "DUPLICATE_RECORD";
    HttpResponseCode[HttpResponseCode["SUCCESS_OK"] = 200] = "SUCCESS_OK";
    HttpResponseCode[HttpResponseCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpResponseCode[HttpResponseCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(HttpResponseCode = exports.HttpResponseCode || (exports.HttpResponseCode = {}));
var ResponseCode;
(function (ResponseCode) {
    ResponseCode[ResponseCode["BAD_REQUEST"] = 91] = "BAD_REQUEST";
    ResponseCode[ResponseCode["NOT_FOUND"] = 25] = "NOT_FOUND";
    ResponseCode[ResponseCode["DUPLICATE_RECORD"] = 4] = "DUPLICATE_RECORD";
    ResponseCode[ResponseCode["UNAUTHORIZED"] = 63] = "UNAUTHORIZED";
    ResponseCode[ResponseCode["INTERNAL_SERVER_ERROR"] = 91] = "INTERNAL_SERVER_ERROR";
})(ResponseCode = exports.ResponseCode || (exports.ResponseCode = {}));
var ResponseMessage;
(function (ResponseMessage) {
    ResponseMessage["NOT_FOUND"] = "not found";
})(ResponseMessage = exports.ResponseMessage || (exports.ResponseMessage = {}));
