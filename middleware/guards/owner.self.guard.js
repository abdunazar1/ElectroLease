module.exports = async function ownerSelfGuard(req, res, next) {
  try {
    const loggedInUser = req.user;
    const targetOwnerId = req.params.id;

    if (loggedInUser.role === "superadmin" || loggedInUser.role === "admin") {
      return next();
    }

    if (
      loggedInUser.role === "owner" &&
      String(loggedInUser.id) === targetOwnerId
    ) {
      return next();
    }

    return res
      .status(403)
      .json({ message: "Sizga bu amalni bajarish taqiqlangan" });
  } catch (error) {
    return res.status(500).json({ message: "Serverda xatolik", error });
  }
};
