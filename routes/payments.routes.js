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

router.post("/", authClientGuard, addNewPayment);

router.get("/", authAdminGuard, getAllPayments);

router.get("/:id", authAdminGuard, getPaymentById);

router.put("/:id", authAdminGuard, updatePaymentById);

router.delete("/:id", authAdminGuard, deletePaymentById);

module.exports = router;
