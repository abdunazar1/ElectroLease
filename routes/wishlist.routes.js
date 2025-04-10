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

const authClientGuard = require("../middleware/guards/auth.Client.guard");
const clientSelfGuard = require("../middleware/guards/client.self.guard");

router.post("/",authClientGuard, addNewWishlistItem);

router.get("/", authClientGuard, getAllWishlistItems);

router.get("/",authClientGuard,clientSelfGuard, getWishlistByClientId);

router.delete("/:id", authClientGuard, clientSelfGuard, deleteWishlistItem);

router.put("/:id", authClientGuard, clientSelfGuard, updateWishlistItem);

module.exports = router;
