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
const config_1 = __importDefault(require("config"));
const user_1 = __importDefault(require("../domain/entities/user"));
const response_dto_1 = __importDefault(require("../dtos/response.dto"));
const BaseException_1 = __importDefault(require("../exceptions/BaseException"));
const NoRecordFoundException_1 = __importDefault(require("../exceptions/NoRecordFoundException"));
const logger_1 = require("../utils/logger");
const constants_1 = require("../utils/constants");
class AuthController {
    constructor(_authService) {
        this._authService = _authService;
        this.baseUrl = config_1.default.get("BASE_URL");
        this.Logger = (0, logger_1.logger)(logger_1.path.dirname(__filename) + "/" + logger_1.path.basename(__filename));
        this.loginHandler = this.loginHandler.bind(this);
        this.createUserHandler = this.createUserHandler.bind(this);
    }
    loginHandler(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = new user_1.default(email, password);
                const token = yield this._authService.login(user);
                res.cookie("access_token", token);
                res.cookie('logged_in', true, Object.assign(Object.assign({}, this.getCookieOptions()), { httpOnly: false }));
                return new response_dto_1.default(`logged in `, 200, token);
            }
            catch (error) {
                this.Logger.error(error);
                if (error instanceof NoRecordFoundException_1.default) {
                    return new BaseException_1.default(error.message, constants_1.HttpResponseCode.NOT_FOUND, constants_1.Status.FAILURE);
                }
                return new BaseException_1.default("Internal server error", constants_1.HttpResponseCode.INTERNAL_SERVER_ERROR, constants_1.Status.FAILURE);
            }
        });
    }
    createUserHandler(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                let user = new user_1.default(email, password);
                yield this._authService.register(user);
                return new response_dto_1.default(`User created successfully`, 200, "");
            }
            catch (error) {
                if (error instanceof BaseException_1.default) {
                    this.Logger.error("Error => " + error);
                    return new BaseException_1.default(error.message, error.httpCode, error.status);
                }
                return new BaseException_1.default("Internal Server Error ", constants_1.HttpResponseCode.INTERNAL_SERVER_ERROR, constants_1.Status.FAILURE);
            }
        });
    }
    forgotPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) {
                if (error instanceof BaseException_1.default) {
                    this.Logger.error("Error => " + error);
                    return new BaseException_1.default(error.message, error.httpCode, error.status);
                }
                return new BaseException_1.default("Internal Server Error ", constants_1.HttpResponseCode.INTERNAL_SERVER_ERROR, constants_1.Status.FAILURE);
            }
        });
    }
    verifyAccountDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { token } = req.query;
                console.log(token);
                return "HELLLLOOOOO";
            }
            catch (error) {
            }
        });
    }
    getCookieOptions() {
        return {
            expires: new Date(Date.now() + 10 * 60 * 1000),
            maxAge: 10 * 60 * 1000,
            httpOnly: true,
            sameSite: 'lax',
        };
    }
}
exports.default = AuthController;
