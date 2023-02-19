import mongoose from "mongoose";
import config from "config";

import logger from '../../../utils/logger';


const connect = async () => {
  try {
    const URI: string = config.get<string>("DB_URI");
    mongoose.set('strictQuery', true);
    mongoose.connect(URI, () => {
      logger.info("Successfully connected to mongodb database server");
    })
  } catch (error) {
    logger.error(error);
  }
}

export default connect;