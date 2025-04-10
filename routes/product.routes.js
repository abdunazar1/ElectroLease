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
const ownerSelfGuard = require("../middleware/guards/owner.self.guard");

router.post("/", authOwnerGuard, addNewProduct);

router.get("/", getAllProducts);

router.get("/:id", getProductById);

router.put("/:id", authOwnerGuard,ownerSelfGuard, updateProductById);

router.delete("/:id", authOwnerGuard,ownerSelfGuard, deleteProductById);

module.exports = router;
