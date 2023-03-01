import express from "express";
import bodyParser from "body-parser";
import config from "config";

import logger from "../../utils/logger";
import connect from "../../config/mongo.connect";
import userRouter from "../routers/express.router";

const PORT = 4041;
const app = express();
const expressConnector = () => {
  app.use(bodyParser.json());
  app.use("/user", userRouter);
  app.listen(PORT, async () => {
    logger.info("Started Application on PORT => " + PORT);

    await connect();
  });
}

export { expressConnector, app };
