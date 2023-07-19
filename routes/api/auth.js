const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getCurrent,
  logout,
  subscription,
  updateAvatar,
} = require("../../controllers/auth");
const { authSchema } = require("../../models/user");
const { validateBody, authenticate, upload } = require("../../middlewares");

router.post("/register", validateBody(authSchema), register);

router.post("/login", validateBody(authSchema), login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

router.patch("/", authenticate, subscription);

router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

module.exports = router;
