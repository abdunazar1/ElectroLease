// payments.router.js
const express = require("express");
const router = express.Router();
const {
  addNewPayment,
  getAllPayments,
  getPaymentById,
  updatePaymentById,
  deletePaymentById,
} = require("../controller/payments.controller");
const authClientGuard = require("../middleware/guards/auth.Client.guard");
const authAdminGuard = require("../middleware/guards/auth.Admin.guard");
const clientSelfGuard = require("../middleware/guards/client.self.guard");

router.post("/", authClientGuard, addNewPayment);

router.get("/", authAdminGuard, getAllPayments);

router.get("/:id", authClientGuard,clientSelfGuard, getPaymentById);

router.put("/:id", authClientGuard,clientSelfGuard , updatePaymentById);

router.delete("/:id", authAdminGuard, deletePaymentById);

module.exports = router;
