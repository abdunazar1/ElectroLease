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
const authAdminGuard = require("../middleware/guards/auth.Admin.guard");

const router = express.Router();

router.post("/register", addNewOwner);
router.post("/login", loginOwner);
router.post("/logout", authOwnerGuard, logOutOwner);
router.post("/refresh", refreshTokenOwner);
router.get("/", authAdminGuard, getAllOwners);
router.get("/:id", authOwnerGuard, ownerSelfGuard, getOwnerById);
router.put("/:id", authOwnerGuard, ownerSelfGuard, updateOwnerById);
router.get("/activate/:link", activateOwners);
router.delete("/:id", authOwnerGuard, deleteOwnerById);

module.exports = router;
