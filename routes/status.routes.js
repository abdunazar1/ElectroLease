const express = require("express");
const { addNewStatus, getAllStatus, getStatusById, updateStatusById, deleteStatusById } = require("../controller/status.controller");


const router = express.Router();

router.post("/", addNewStatus);
router.get("/", getAllStatus);
router.get("/:id", getStatusById);
router.put("/:id", updateStatusById);
router.delete("/:id", deleteStatusById);

module.exports = router;
