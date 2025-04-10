// contracts.router.js
const express = require("express");
const router = express.Router();
const {
  addNewContract,
  getAllContracts,
  getContractById,
  updateContractById,
  deleteContractById,
  getAllMyContractsForClient,
} = require("../controller/contracts.controller");
const authClientGuard = require("../middleware/guards/auth.Client.guard");
const authAdminGuard = require("../middleware/guards/auth.Admin.guard");
const clientSelfGuard = require("../middleware/guards/client.self.guard");

router.get("/myContracts", authClientGuard, getAllMyContractsForClient);
router.post("/", authClientGuard, addNewContract);

router.get("/", authAdminGuard, getAllContracts);

router.get("/:id", authClientGuard, clientSelfGuard, getContractById);

router.put("/:id", authAdminGuard, updateContractById);

router.delete("/:id", authAdminGuard, deleteContractById);

module.exports = router;
