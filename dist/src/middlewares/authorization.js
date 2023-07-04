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
exports.restrictTo = exports.authenticate = exports.extractAuthenticatedUser = void 0;
const BaseException_1 = __importDefault(require("../exceptions/BaseException"));
const constants_1 = require("../utils/constants");
const jsonwebtoken_1 = require("../utils/jsonwebtoken");
const config_1 = __importDefault(require("config"));
const jsonwebtoken_2 = require("jsonwebtoken");
const logger_1 = require("../utils/logger");
const Logger = (0, logger_1.logger)(logger_1.path.dirname(__filename) + "/" + logger_1.path.basename(__filename));
const jwtSecret = config_1.default.get("JWT_SECRET");
const extractAuthenticatedUser = (repo) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        let access_token;
        if (req.headers.authorization !== null) {
            if ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.startsWith("BEARER")) {
                access_token = req.headers.authorization.split(" ")[1];
            }
        }
        else if (req.cookies !== undefined && ((_b = req.cookies) === null || _b === void 0 ? void 0 : _b.access_token)) {
            access_token = req.cookies.access_token;
        }
        if (!access_token)
            return res.status(constants_1.HttpResponseCode.UNAUTHORIZED).json(new BaseException_1.default("Unauthorized", constants_1.HttpResponseCode.UNAUTHORIZED, constants_1.Status.FAILURE));
        const isTokenValid = (0, jsonwebtoken_1.verifyToken)(access_token, jwtSecret);
        if (!isTokenValid)
            return res.status(constants_1.HttpResponseCode.UNAUTHORIZED).json(new BaseException_1.default("Unauthorized", constants_1.HttpResponseCode.UNAUTHORIZED, constants_1.Status.FAILURE));
        if (isTokenValid.email === null)
            return res.status(constants_1.HttpResponseCode.UNAUTHORIZED).json(new BaseException_1.default("Unauthorized", constants_1.HttpResponseCode.UNAUTHORIZED, constants_1.Status.FAILURE));
        const exclude = ["password"];
        const user = yield repo.findUserByEmail(isTokenValid.email, exclude);
        if (isTokenValid.email) {
            if (!user)
                return res.status(constants_1.HttpResponseCode.UNAUTHORIZED).json(new BaseException_1.default("User does not exist !", constants_1.HttpResponseCode.UNAUTHORIZED, constants_1.Status.FAILURE));
        }
        res.locals.user = user;
        return next();
    }
    catch (error) {
        Logger.error(`Error => ${error}`);
        if (error instanceof jsonwebtoken_2.JsonWebTokenError) {
            return res.status(constants_1.HttpResponseCode.UNAUTHORIZED).json(new BaseException_1.default("Unauthorized", constants_1.HttpResponseCode.UNAUTHORIZED, constants_1.Status.FAILURE));
        }
        return res.status(500).json(new BaseException_1.default("Internal Server Error", 500, constants_1.Status.FAILURE));
    }
});
exports.extractAuthenticatedUser = extractAuthenticatedUser;
const authenticate = (req, res, next) => {
    try {
        const user = res.locals.user;
        if (!user) {
            return res.status(constants_1.HttpResponseCode.UNAUTHORIZED).json(new BaseException_1.default("Unauthorized", constants_1.HttpResponseCode.UNAUTHORIZED, constants_1.Status.FAILURE));
        }
        return next();
    }
    catch (err) {
        return res.status(500).json(new BaseException_1.default("Internal Server Error", 500, constants_1.Status.FAILURE));
    }
};
exports.authenticate = authenticate;
const restrictTo = (...allowedRoles) => (req, res, next) => {
    const user = res.locals.user;
    if (!allowedRoles.includes(user.role)) {
        return res.status(constants_1.HttpResponseCode.UNAUTHORIZED).json(new BaseException_1.default("Access denied", constants_1.HttpResponseCode.UNAUTHORIZED, constants_1.Status.FAILURE));
    }
    next();
};
exports.restrictTo = restrictTo;
