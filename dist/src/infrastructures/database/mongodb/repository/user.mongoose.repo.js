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
const user_model_1 = __importDefault(require("../models/user.model"));
const User_1 = __importDefault(require("../../../../domain/entities/User"));
class UserRepoMongo {
    createUser(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExist = yield user_model_1.default.findOne({ email: input.email });
            if (isExist)
                throw new Error(`User with email : ${input.email} already exists`);
            const newUser = new user_model_1.default(input);
            yield newUser.save();
            return new User_1.default(input.email, newUser.password, newUser.role, newUser.permissions);
        });
    }
    findUserByEmail(email, excludeFields) {
        return __awaiter(this, void 0, void 0, function* () {
            const exclude = excludeFields.map(field => "-" + field);
            const user = yield user_model_1.default.findOne({ email }).select(exclude);
            if (!user)
                return null;
            let foundUser = new User_1.default(user.email, user.password, user.role, user.permissions);
            return foundUser;
        });
    }
    findAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            let users = yield user_model_1.default.find();
            return users.map(user => new User_1.default(user.email, "", user === null || user === void 0 ? void 0 : user.role, user === null || user === void 0 ? void 0 : user.permissions));
        });
    }
    updateUser() {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: implement update user date based on queries.
            return null;
        });
    }
}
exports.default = UserRepoMongo;
