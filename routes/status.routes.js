const express = require("express");
const {
  addNewStatus,
  getAllStatus,
  getStatusById,
  updateStatusById,
  deleteStatusById,
} = require("../controller/status.controller");
const authAdminGuard = require("../middleware/guards/auth.Admin.guard");

const router = express.Router();

router.post("/", authAdminGuard, addNewStatus);
router.get("/", authAdminGuard,getAllStatus);
router.get("/:id", authAdminGuard, getStatusById);
router.put("/:id", authAdminGuard, updateStatusById);
router.delete("/:id",authAdminGuard, deleteStatusById);

module.exports = router;
