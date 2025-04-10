const express = require("express");
const {
  addNewCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
} = require("../controller/categories.controller");

const router = express.Router();

const authAdminGuard = require("../middleware/guards/auth.Admin.guard");

router.post("/register", authAdminGuard, addNewCategory);
router.get("/",  getAllCategories);
router.get("/:id",  getCategoryById);
router.put("/:id", authAdminGuard, updateCategoryById);
router.delete("/:id", authAdminGuard, deleteCategoryById);

module.exports = router;
