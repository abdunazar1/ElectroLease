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
const clientSelfGuard = require("../middleware/guards/client.self.guard");

router.post("/", authClientGuard, addNewContractItem);

router.get("/", authAdminGuard, getAllContractItems);

router.get("/:id", authClientGuard, clientSelfGuard, getContractItemById);

router.put("/:id", authClientGuard, clientSelfGuard, updateContractItemById);

router.delete("/:id", authClientGuard, clientSelfGuard, deleteContractItemById);

module.exports = router;
