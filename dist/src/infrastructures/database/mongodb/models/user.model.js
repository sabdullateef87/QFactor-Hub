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
exports.userSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_enc_1 = require("../../../encryption/bcrypt.enc");
const user_interface_1 = require("../../../../domain/interfaces/user.interface");
exports.userSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: user_interface_1.Role, default: "USER" },
    permissions: [{ type: String }],
    isActive: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false }
}, { timestamps: true });
exports.userSchema.pre('save', function (next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        var user = this;
        if (!user.isModified("password")) {
            return next();
        }
        if (user.isNew) {
            const hashedPassword = yield (0, bcrypt_enc_1.hashString)(user.password);
            (_a = user.permissions) === null || _a === void 0 ? void 0 : _a.push("CAN_VIEW");
            user.password = hashedPassword;
        }
        next();
    });
});
const UserModel = mongoose_1.default.model("User", exports.userSchema);
exports.default = UserModel;
