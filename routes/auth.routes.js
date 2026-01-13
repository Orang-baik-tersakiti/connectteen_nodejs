const express = require("express");
const {
  googleSignIn,
  googleSignInCallback,
  registerAdminOnly,
  loginAdmin,
  getAuthenticated,
  guestLogin,
} = require("../controllers/auth.controller");
const {
  authMiddleware,
  adminOnly,
  optionalAuth,
} = require("../middleware/auth");

const router = express.Router();

router.get("/google", googleSignIn);
router.get("/google/callback", optionalAuth, googleSignInCallback);

router.post("/admin/register", authMiddleware, adminOnly, registerAdminOnly);
router.post("/admin/login", loginAdmin);
router.post("/guest/login", guestLogin);
router.get("/me", getAuthenticated);

module.exports = router;
