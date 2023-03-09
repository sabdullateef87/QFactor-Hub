import express from "express";
import bodyParser from "body-parser";
import userRouter from "../routers/express.router";
import morgan from "morgan";
const app = express();

app.use(morgan('combined'));

app.use(bodyParser.json());
app.use("/user", userRouter);

export { app };
