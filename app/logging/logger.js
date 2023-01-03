const { createLogger, format, transports, config } = require("winston");
const { combine, timestamp, json } = format;

const logger = createLogger({
  defaultMeta: {
    component: "sampleAPIScaffold",
  },
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    json()
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: "logs/sampleErrors.log",
      level: "error",
    }),
    new transports.File({
      filename: "logs/sample.log",
      levels: ["info", "warn", "error"],
    }),
    new transports.File({
      filename: "logs/sampleDebug.log",
      levels: ["verbose", "debug", "silly"],
    }),
  ],
  exceptionHandlers: [
    new transports.File({
      filename: "logs/sampleExceptions.log",
    }),
  ],
});

module.exports = logger;
