const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf } = format;
const path = require("path");

const myFormat = printf(({ level, message, label, timestamp }) => {
  const safeLevel = level ? level.toUpperCase() : "UNKNOWN";
  return `${timestamp} [${label}] ${safeLevel}: ${message}`;
});

const logger = createLogger({
  level: "info",
  format: combine(
    label({ label: "ElectroLease" }),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    myFormat
  ),
  transports: [
    new transports.Console({ level: "debug" }),
    new transports.File({
      filename: path.join(__dirname, "../log/error.log"),
      level: "error",
    }),
    new transports.File({
      filename: path.join(__dirname, "../log/combined.log"),
      level: "info",
    }),
  ],
  exitOnError: false,
});

logger.exceptions.handle(
  new transports.File({
    filename: path.join(__dirname, "../log/exceptions.log"),
  })
);

logger.rejections.handle(
  new transports.File({
    filename: path.join(__dirname, "../log/rejections.log"),
  })
);

module.exports = logger;
