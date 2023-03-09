import { app } from "./infrastructures/http/express.infra";
import {logger, path} from "./utils/logger";
import connect from "./config/mongo.connect";
import { sayHelloCron } from './schedulers/index';
const PORT = 4041;

const Logger = logger(path.dirname(__filename) + "/" + path.basename(__filename));


// sayHelloCron();
app.listen(PORT, async () => {
    Logger.info("Started Application on PORT : " + PORT);
    await connect();
});


export default app;