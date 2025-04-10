const { errorHandler } = require("../../helpers/error_handler");
const jwtClientService = require("../../services/jwt.client.service");

module.exports = async function (req, res, next) {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res
        .status(403)
        .send({ message: "Authorization token berilmagan" });
    }

    const bearer = authorization.split(" ")[0];
    const token = authorization.split(" ")[1];
    if (bearer != "Bearer" || !token) {
      return res.status(403).send({ message: "Bearer yoki token berilmagan" });
    }

    const decodedToken = await jwtClientService.verifyAccessClientToken(token);

    if (decodedToken.role !== "client") {
      return res
        .status(403)
        .send({ message: "Sizga bu resursga kirish ruxsati yo'q" });
    }

    req.user = decodedToken;
    console.log(decodedToken);
    next();
  } catch (error) {
    return res.status(403).send("Faqat Clientlar uchun!");
  }
};
