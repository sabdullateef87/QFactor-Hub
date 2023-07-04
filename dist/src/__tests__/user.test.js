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
const supertest_1 = __importDefault(require("supertest"));
const express_infra_1 = require("../infrastructures/http/express.infra");
const mongoose_1 = __importDefault(require("mongoose"));
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    const { MongoMemoryServer } = require('mongodb-memory-server');
    const mongod = yield MongoMemoryServer.create();
    const URI = mongod.getUri();
    mongoose_1.default.set('strictQuery', true);
    yield mongoose_1.default.connect(URI);
}));
/* Closing database connection after each test. */
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
    yield mongoose_1.default.disconnect();
}));
describe("GET ", () => {
    it("should return all users", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(express_infra_1.app).get("/user/all");
        expect(res.statusCode).toBe(200);
    }));
});
