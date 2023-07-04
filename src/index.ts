import { app } from "./infrastructures/http/express.infra";
import { logger, path } from "./utils/logger";
import connect from "./config/mongo.connect";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from "./api-docs/config";

const PORT = 4041;

const Logger = logger(path.dirname(__filename) + "/" + path.basename(__filename));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.listen(PORT, async () => {
    Logger.info("Started Application on PORT : " + PORT);
    await connect();
});

export default app;