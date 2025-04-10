const router = require("express").Router();

router.use("/admin", require("./admin.routes"));
router.use("/owner", require("./owner.routes"));
router.use("/client", require("./clients.routes"));
router.use("/category", require("./category.routes"));
router.use("/status", require("./status.routes"));
router.use("/product", require("./product.routes"));
router.use("/payments", require("./payments.routes"));
router.use("/wishlist", require("./wishlist.routes"));
router.use("/damages", require("./damages.routes"));
router.use("/contract", require("./contracts.routes"));
router.use("/contractItem", require("./contract_item.routes"));

module.exports = router;
