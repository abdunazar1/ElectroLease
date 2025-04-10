const ApiError = require("../../helpers/api.error");
const logger = require("../../services/logger.service");

module.exports = function (err, req, res, next) {
  logger.error(`[${req.method}] ${req.url} ${err.message} - ${err.stack}`);
  if (err instanceof ApiError) {
    return res.status(err.status).json(err.toJson());
  }

  if (err instanceof SyntaxError) {
    return res.status(400).json({ message: "Invalid JSON syntax" });
  }
  return res.status(500).json(ApiError.internal("Something went wrong"));
};
