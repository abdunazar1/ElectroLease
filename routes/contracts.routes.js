// contracts.router.js
const express = require("express");
const router = express.Router();
const {
  addNewContract,
  getAllContracts,
  getContractById,
  updateContractById,
  deleteContractById,
} = require("../controller/contracts.controller");
const authClientGuard = require("../middleware/guards/auth.Client.guard");
const authAdminGuard = require("../middleware/guards/auth.Admin.guard");

router.post("/",authClientGuard, addNewContract);

router.get("/",authAdminGuard, getAllContracts);

router.get("/:id",authAdminGuard, getContractById);

router.put("/:id", authClientGuard, updateContractById);

router.delete("/:id",authAdminGuard, deleteContractById);

module.exports = router;
