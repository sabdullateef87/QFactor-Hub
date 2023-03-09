import mongoose from "mongoose";
import config from "config";
import { logger,path } from "../utils/logger";
const Logger = logger(path.dirname(__filename) + "/" + path.basename(__filename));


const connect = async () => {
  try {
    const URI: string = config.get<string>("DB_URI");
    mongoose.set('strictQuery', true);
    mongoose.connect(URI, () => {
      Logger.info("Successfully connected to mongodb database server");
    })
  } catch (error) {
    Logger.error(error);
  }
}

export default connect;