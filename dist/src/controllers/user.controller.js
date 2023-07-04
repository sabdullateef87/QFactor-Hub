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
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../utils/logger");
const Logger = (0, logger_1.logger)(logger_1.path.dirname(__filename) + "/" + logger_1.path.basename(__filename));
class UserController {
    constructor(_userService) {
        this._userService = _userService;
        this.createUserHandler = this.createUserHandler.bind(this);
        this.getAllUser = this.getAllUser.bind(this);
    }
    createUserHandler(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._userService.createUser(req.body);
        });
    }
    sayHello(req, res) {
        return { name: "adeiza", surname: "Ajay" };
    }
    getAllUser() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._userService.getAllUsers();
        });
    }
}
exports.default = UserController;
