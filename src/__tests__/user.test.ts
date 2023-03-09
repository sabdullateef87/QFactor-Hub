import request from "supertest";
import { app } from "../infrastructures/http/express.infra";
import connect from "../config/mongo.connect";
import mongoose from "mongoose";

beforeEach(async () => {
    const { MongoMemoryServer } = require('mongodb-memory-server');
    const mongod = await MongoMemoryServer.create()
    const URI = mongod.getUri();
    mongoose.set('strictQuery', true);
    await mongoose.connect(URI);
});

/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
    await mongoose.disconnect();
});

describe("GET ", () => {
    it("should return all users", async () => {
        const res = await request(app).get("/user/all");
        expect(res.statusCode).toBe(200);
    });
});
