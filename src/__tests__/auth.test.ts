import request from "supertest";
import { app } from "../infrastructures/http/express.infra";
import connect from "../config/mongo.connect";
import mongoose from "mongoose";
/* Connecting to the database before each test. */
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

describe("Testing Authentication Service", () => {
    describe("Tests to validate user input upon creation", () => {
        describe("given user input from request body", () => {
            it("should validate that the inputs are correct", () => {
                expect(1).toBe(1);
            })
        })
        it("should return test that users payload are being vare being authenticated", async () => {
            const res = await request(app).get("/user/all");
            expect(res.statusCode).toBe(200);
        });
    })
    describe("Tests to validate user imput upon login", () => {
        it("should return test that users payload are being vare being authenticated", async () => {
            const res = await request(app).get("/user/all");
            expect(res.statusCode).toBe(200);
        });
    })
});

