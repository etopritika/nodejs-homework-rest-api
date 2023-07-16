const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getCurrent,
  logout,
  subscription,
} = require("../../controllers/auth");
const { authSchema } = require("../../models/user");
const { validateBody, authenticate } = require("../../middlewares");

router.post("/register", validateBody(authSchema), register);

router.post("/login", validateBody(authSchema), login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

router.patch("/", authenticate, subscription);

module.exports = router;
