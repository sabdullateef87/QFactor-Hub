import pino from 'pino';
import pretty from 'pino-pretty';

const stream = pretty({
  colorize: true,
  customPrettifiers: {},
  messageFormat: '{levelLabel} - {pid}'

})

const logger = pino(stream)


export default logger;