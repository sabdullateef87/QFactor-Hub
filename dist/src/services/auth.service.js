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
exports.AuthService = void 0;
const config_1 = __importDefault(require("config"));
const user_1 = __importDefault(require("../domain/entities/user"));
const BaseException_1 = __importDefault(require("../exceptions/BaseException"));
const NoRecordFoundException_1 = __importDefault(require("../exceptions/NoRecordFoundException"));
const constants_1 = require("../utils/constants");
const bcrypt_enc_1 = require("../infrastructures/encryption/bcrypt.enc");
const jsonwebtoken_1 = require("../utils/jsonwebtoken");
const logger_1 = require("../utils/logger");
const sendEmail_1 = require("../infrastructures/services/mail_service/sendEmail");
class AuthService {
    constructor(_userRepo) {
        this._userRepo = _userRepo;
        this.baseUrl = config_1.default.get("BASE_URL");
        this.Logger = (0, logger_1.logger)(logger_1.path.dirname(__filename) + "/" + logger_1.path.basename(__filename));
    }
    login(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = body;
            if (!email || !password)
                throw new BaseException_1.default("Invalid login parameters", 0, "");
            const isExists = yield this._userRepo.findUserByEmail(email, []);
            if (!isExists)
                throw new NoRecordFoundException_1.default("User does not exist", constants_1.ResponseCode.NOT_FOUND, constants_1.Status.FAILURE);
            const isMatch = (0, bcrypt_enc_1.compare)(body.password, isExists.password);
            if (!isMatch)
                throw new BaseException_1.default("Unauthorized, password incorrect", constants_1.ResponseCode.BAD_REQUEST, constants_1.Status.FAILURE);
            const paylod = { email };
            const token = (0, jsonwebtoken_1.generateToken)(paylod);
            return token;
        });
    }
    register(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = body;
                if (!email || !password)
                    throw new BaseException_1.default("Invalid login parameters", 0, "");
                const isExists = yield this._userRepo.findUserByEmail(email, []);
                if (isExists)
                    throw new BaseException_1.default("User already exist", constants_1.HttpResponseCode.DUPLICATE_RECORD, constants_1.Status.FAILURE);
                const newUser = new user_1.default(email, password);
                const user = yield this._userRepo.createUser(newUser);
                this.Logger.info("User created successfully.");
                this.Logger.info("Attempting to send a verification link to the user.");
                yield this.sendVerificationLink(email);
                return user;
            }
            catch (error) {
                this.Logger.error(error);
                throw error;
            }
        });
    }
    forgotPassword() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    sendVerificationLink(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = (0, jsonwebtoken_1.generateToken)(email);
                const verificationLink = `${this.baseUrl}/verify?token=${token}`;
                const mailOpiton = {
                    to: `${email}`,
                    subject: "Verification Link",
                    text: `Kindly use the link provided to verify your account -> ${verificationLink}`
                };
                this.Logger.info(`Sending verification link to - ${email}`);
                yield (0, sendEmail_1.sendEmail)(mailOpiton)
                    .then(info => {
                    this.Logger.info(`Successfully sent verification link : ${info}`);
                })
                    .catch(error => this.Logger.error(error));
            }
            catch (error) {
                this.Logger.error(error);
                throw new BaseException_1.default("Unable to send verification SMS to the user, pushing the data to the queue for a retry", constants_1.HttpResponseCode.INTERNAL_SERVER_ERROR, constants_1.Status.FAILURE);
            }
        });
    }
    verifyNewUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.AuthService = AuthService;
