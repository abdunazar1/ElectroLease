const { errorHandler } = require("../../helpers/error_handler");

module.exports = function (req, res, next) {
  try {
    if (req.user?.role !== "admin" && req.user?.role !== "superadmin") {
      return res
        .status(403)
        .send({ message: "Faqat adminlar va super adminlar kirishi mumkin" });
    }

    next();
  } catch (error) {
    errorHandler(error, res);
  }
};
