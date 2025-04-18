const logger = require("../services/logger.service");

const errorHandler = (err,res) => {
  logger.log(err);
  res.status(400).send({ error: err.message });
};

module.exports = {
  errorHandler,
};
