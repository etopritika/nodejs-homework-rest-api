const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getCurrent,
  logout,
  subscription,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
} = require("../../controllers/auth");
const { authSchema, verifySchema } = require("../../models/user");
const { validateBody, authenticate, upload } = require("../../middlewares");

router.post("/register", validateBody(authSchema), register);

router.get("/verify/:verificationToken", verifyEmail);

router.post("/verify", validateBody(verifySchema), resendVerifyEmail);

router.post("/login", validateBody(authSchema), login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

router.patch("/", authenticate, subscription);

router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

module.exports = router;
