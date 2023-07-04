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
const express_infra_1 = require("./infrastructures/http/express.infra");
const logger_1 = require("./utils/logger");
const mongo_connect_1 = __importDefault(require("./config/mongo.connect"));
const PORT = 4041;
const Logger = (0, logger_1.logger)(logger_1.path.dirname(__filename) + "/" + logger_1.path.basename(__filename));
// sayHelloCron();
express_infra_1.app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    Logger.info("Started Application on PORT : " + PORT);
    yield (0, mongo_connect_1.default)();
}));
exports.default = express_infra_1.app;
