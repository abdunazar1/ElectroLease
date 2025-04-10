const { errorHandler } = require("../../helpers/error_handler");

module.exports = function (req, res, next) {
  try {
    const id = req.params.id;
    if (id != req.user.id) {
      return res.status(403).send({
        message: "Faqat o'z ma'lumotlaringizni ko'rish/yangilash mumkin!",
      });
    }

    next();
  } catch (error) {
    errorHandler(error, res);
  }
};
