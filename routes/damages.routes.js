// damages.router.js
const express = require("express");
const router = express.Router();
const {
  addNewDamage,
  getAllDamages,
  getDamageById,
  updateDamageById,
  deleteDamageById,
} = require("../controller/damages.controller");

router.post("/", addNewDamage);

router.get("/", getAllDamages);

router.get("/:id", getDamageById);

router.put("/:id", updateDamageById);

router.delete("/:id", deleteDamageById);

module.exports = router;
