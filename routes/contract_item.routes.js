const express = require("express");
const router = express.Router();
const {
  addNewContractItem,
  getAllContractItems,
  getContractItemById,
  updateContractItemById,
  deleteContractItemById,
} = require("../controller/contract_item.controller");
const authClientGuard = require("../middleware/guards/auth.Client.guard");
const authAdminGuard = require("../middleware/guards/auth.Admin.guard");
const adminIsadminGuard = require("../middleware/guards/admin.isadmin.guard");

router.post("/",authClientGuard,addNewContractItem);

router.get("/", authAdminGuard, getAllContractItems);

router.get("/:id", authAdminGuard,getContractItemById);

router.put("/:id", authClientGuard, updateContractItemById);

router.delete("/:id", authAdminGuard, deleteContractItemById);

module.exports = router;
