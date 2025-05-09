const ApiError = require("../../helpers/api.error");
const { errorHandler } = require("../../helpers/error_handler");

module.exports = (roles = []) => {
  return (req, res, next) => {
    try {
      if (!req.user || !req.user.role) {
        return res.status(403).send({
          message: "Foydalanuvchi rolini aniqlashda xatolik yuz berdi",
        });
      }

      if (!roles.includes(req.user.role)) {
        return res.status(403).send({ message: "Ruxsat yo'q" });
      }

      next(); 
    } catch (err) {
      errorHandler(err, res);
    }
  };
};
