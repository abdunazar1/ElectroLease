const express = require("express");
const {
  addNewClient,
  loginClient,
  logOutClient,
  refreshTokenClient,
  getAllClients,
  getClientById,
  updateClientById,
  deleteClientById,
  activateClient,
} = require("../controller/clients.controller");

const clientAuth = require("../middleware/guards/auth.Client.guard");
const clientSelfGuard = require("../middleware/guards/client.self.guard");
const authAdminGuard = require("../middleware/guards/auth.Admin.guard");

const router = express.Router();

router.post("/register", addNewClient);
router.post("/login", loginClient);
router.post("/logout", clientAuth, logOutClient);
router.post("/refresh", refreshTokenClient);

router.get("/activate/:link", activateClient);

router.get("/:id", clientAuth, clientSelfGuard, getClientById);
router.get("/foradmin/:id", authAdminGuard, getClientById);
router.put("/:id", clientAuth, clientSelfGuard, updateClientById);

router.get("/", authAdminGuard, getAllClients);
router.delete("/:id", authAdminGuard, deleteClientById);

module.exports = router;

/**
 * FAOLIYATLAR TAQSIMOTI (CLIENT ROUTES)
 *
 * 1. Client o‘zi ro‘yhatdan o‘tadi
 * 2. Client login/logout/refresh qiladi
 * 3. Client faqat o‘z ma’lumotlarini ko‘rishi va yangilashi mumkin
 * 4. Admin/Superadmin barcha clientlarni ko‘ra oladi
 * 5. Admin/Superadmin istalgan clientni o‘chira oladi
 * 6. Client email orqali akkauntini faollashtiradi
 */
