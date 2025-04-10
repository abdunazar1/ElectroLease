
const logger = require("../services/logger.service");

const errorHandler = (err, req, res, next) => {
  logger.error(`${err.message}\n${err.stack}`);
  res.status(400).send({ error: err.message });
};

module.exports = {
  errorHandler,
};
