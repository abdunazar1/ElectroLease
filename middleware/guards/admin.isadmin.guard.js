const { errorHandler } = require("../../helpers/error_handler");

module.exports = function (req, res, next) {
  try {
  if (req.user.role !== "admin") {
    return req.status(403).send({ message: "Faqat adminlar kirishi mumkin" });
  }

  next();
} catch (error) {
  errorHandler(error, res)
}
};
