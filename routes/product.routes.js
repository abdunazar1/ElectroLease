const express = require("express");
const router = express.Router();

const {
  addNewProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("../controller/product.controller");

const authOwnerGuard = require("../middleware/guards/auth.Owner.guard");
const authAdmintGuard = require("../middleware/guards/auth.Admin.guard");

router.post("/", authOwnerGuard, addNewProduct);

router.get("/", getAllProducts);

router.get("/:id", getProductById);

router.put("/:id", authAdmintGuard, updateProductById);

router.delete("/:id", authAdmintGuard, deleteProductById);

module.exports = router;
