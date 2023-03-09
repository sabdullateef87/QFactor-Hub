import { createLogger, transports, format } from "winston";
import path from "path";

const logger = (filename?: any | "") => createLogger({
  transports: [new transports.Console()],
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.json(),
    format.printf(({ timestamp, level, message, service }) => {
      return `[${timestamp}] - [ path : ${service} ] - ${level}: ${message}`;
    })
  ),
  defaultMeta: {
    service: filename === (null || undefined) ? "" : filename,
  },
});
export { logger, path }
