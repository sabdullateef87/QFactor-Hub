"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateForgetPasswordRequest = exports.validateCreateUserBody = exports.validateCreateUserRequest = void 0;
const ValidationException_1 = __importDefault(require("../exceptions/ValidationException"));
const index_1 = require("../validators/user/index");
const user_dto_1 = require("../dtos/user.dto");
const constants_1 = require("../utils/constants");
const BaseException_1 = __importDefault(require("../exceptions/BaseException"));
const validateCreateUserRequest = (req, res, next) => {
    if (!(0, index_1.isCreateUserDtoValidated)(req.body)) {
        return res.status(400).json({ "message": `Bad Request` });
    }
    next();
};
exports.validateCreateUserRequest = validateCreateUserRequest;
const validateCreateUserBody = (req, res, next) => {
    try {
        const user = {
            email: req.body.email,
            password: req.body.password
        };
        const isValid = user_dto_1.createUserSchema.validate(user);
        if (isValid.error) {
            const errorMessage = isValid.error.message;
            let error = new ValidationException_1.default(errorMessage, constants_1.ResponseCode.BAD_REQUEST, constants_1.Status.FAILURE);
            return res.status(constants_1.HttpResponseCode.BAD_REQUEST).json(error);
        }
        next();
    }
    catch (error) {
        return res.status(400).json({ "message": error });
    }
};
exports.validateCreateUserBody = validateCreateUserBody;
const validateForgetPasswordRequest = (req, res, next) => {
    try {
        const { email, newPassword, confirmNewPassword } = req.body;
        if (!email || !newPassword || !confirmNewPassword)
            return new BaseException_1.default("Invalid Paramters", constants_1.HttpResponseCode.BAD_REQUEST, constants_1.Status.FAILURE);
        const isValid = user_dto_1.forgotPasswordSchema.validate(req.body);
        if (isValid.error) {
            const errorMessage = isValid.error.message;
            let error = new ValidationException_1.default(errorMessage, constants_1.ResponseCode.BAD_REQUEST, constants_1.Status.FAILURE);
            return res.status(constants_1.HttpResponseCode.BAD_REQUEST).json(error);
        }
        next();
    }
    catch (error) {
        return res.status(400).json({ "message": error });
    }
};
exports.validateForgetPasswordRequest = validateForgetPasswordRequest;
