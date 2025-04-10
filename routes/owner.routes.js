const express = require("express");

const {
  addNewOwner,
  loginOwner,
  logOutOwner,
  refreshTokenOwner,
  getAllOwners,
  getOwnerById,
  updateOwnerById,
  deleteOwnerById,
  activateOwners,
} = require("../controller/owner.controller");

const authOwnerGuard = require("../middleware/guards/auth.Owner.guard");
const ownerSelfGuard = require("../middleware/guards/owner.self.guard");
const roleGuard = require("../middleware/guards/admin.role.guard");
const authAdminGuard = require("../middleware/guards/auth.Admin.guard");

const router = express.Router();

/**
 * FAOLIYATLAR TAQSIMOTI
 * 1. Owner o'zi ro'yxatdan o'tadi                => Hech qanday guard kerak emas
 * 2. Owner login/logout/refresh qiladi           => auth.Owner.guard
 * 3. Admin/superadmin barcha ownerlarni ko‘radi  => auth.Owner.guard + role.guard(["admin", "superadmin"])
 * 4. Owner faqat o‘zini ko‘radi/yangi qiladi      => auth.Owner.guard + owner.self.guard
 * 5. Admin/superadmin o‘chira oladi              => auth.Owner.guard + role.guard(["admin", "superadmin"])
 */

router.post("/register", addNewOwner);

router.post("/login", loginOwner); 
router.post("/logout", authOwnerGuard, logOutOwner); // logout
router.post("/refresh", authOwnerGuard, refreshTokenOwner); // refresh

router.get(
  "/",
  authAdminGuard,
  roleGuard(["admin", "superadmin"]),
  getAllOwners
); 

router.get("/:id", authOwnerGuard, ownerSelfGuard, getOwnerById); 
router.put("/:id", authOwnerGuard, ownerSelfGuard, updateOwnerById); 

router.get("/activate/:link", activateOwners);

router.delete(
  "/:id",
  authOwnerGuard,
  roleGuard(["admin", "superadmin"]),
  deleteOwnerById
); 

module.exports = router;
