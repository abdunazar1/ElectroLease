const express = require("express");
const {
  addNewAdmin,
  loginAdmin,
  logOutAdmin,
  refreshTokenAdmin,
  getAllAdmins,
  getAdminById,
  updateAdminById,
  deleteAdminById,
} = require("../controller/admin.controller");

const authGuard = require("../middleware/guards/auth.Admin.guard");
const roleGuard = require("../middleware/guards/admin.role.guard");
const adminSelfGuard = require("../middleware/guards/admin.self.guard");

const router = express.Router();

router.post("/register", authGuard, roleGuard(["superadmin"]), addNewAdmin);//

router.post("/login", loginAdmin);

router.post("/logout", authGuard, logOutAdmin);

router.post("/refresh", refreshTokenAdmin);

router.get("/", authGuard, roleGuard(["superadmin"]), getAllAdmins);

router.get("/:id", authGuard, adminSelfGuard, getAdminById);
router.get("/forsuperadmin/:id", authGuard, roleGuard(["superadmin"]), getAdminById);


router.put("/:id", authGuard, adminSelfGuard, updateAdminById);

router.delete("/:id", authGuard, roleGuard(["superadmin"]), deleteAdminById);

module.exports = router;
