const express = require("express");
const {
  addNewWishlistItem,
  getAllWishlistItems,
  getWishlistByClientId,
  deleteWishlistItem,
  updateWishlistItem,
} = require("../controller/wishlist.controller");
const authAdminGuard = require("../middleware/guards/auth.Admin.guard");
const router = express.Router();

const authClientGuard = require("../middleware/guards/auth.Client.guard")

router.post("/",authClientGuard, addNewWishlistItem);

router.get("/", authClientGuard, getAllWishlistItems);

router.get("/client/:client_id", getWishlistByClientId);

router.delete("/:wishlist_id", authAdminGuard, deleteWishlistItem);

router.put("/:wishlist_id",authClientGuard, updateWishlistItem);

module.exports = router;
