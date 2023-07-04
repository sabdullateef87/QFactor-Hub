import express from "express";
import bodyParser from "body-parser";
import userRouter from "../routers/express.router";
import morgan from "morgan";
import cors from "cors";
const app = express();

const allowedOrigins = ['http://localhost:5173'];
const options: cors.CorsOptions = {
    origin: allowedOrigins
};

app.use(morgan('combined'));
app.use(cors(options))
app.use(bodyParser.json());
app.use("/user", userRouter);

export { app };
