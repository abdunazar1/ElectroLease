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
const adminIsadminGuard = require("../middleware/guards/admin.isadmin.guard");

/**
 * FAOLIYATLAR TAQSIMOTI
 * 1. Admin, superadmin va owner category qo'shishi mumkin
 * 2. Admin  categoryni o'zgartirishi mumkin
 * 3. Admin va superadmin categoryni o'chirishi mumkin
 * 4. Admin, owner va superadmin barcha categorylarni ko'ra oladi
 */

router.post("/register", authAdminGuard,adminIsadminGuard, addNewCategory);
router.get("/",  getAllCategories);
router.get("/:id",  getCategoryById);
router.put("/:id", authAdminGuard, updateCategoryById);
router.delete("/:id", authAdminGuard, deleteCategoryById);

module.exports = router;
