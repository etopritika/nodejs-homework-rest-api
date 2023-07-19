const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const { User } = require("../models/user");

const { httpError, controllerWrapper } = require("../helpers/index");

const { SECRET_KEY } = require("../config");

const avatarDir = path.join(__dirname, "../", "/public", "avatars");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw httpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email, { s: 250 });

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });
  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const { subscription } = user;

  if (!user) {
    throw httpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw httpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user.id, { token });
  res.json({ token, email, subscription });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json({ message: "Logging out" });
};

const subscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  if (
    subscription !== "starter" &&
    subscription !== "pro" &&
    subscription !== "business"
  ) {
    res.status(400).json({
      message: `Subscription should be: 'starter', 'pro', 'business'`,
    });
    return;
  }
  await User.findByIdAndUpdate(_id, { subscription: subscription });
  res.status(201).json({ message: `Subscription changed to: ${subscription}` });
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarDir, filename);

  const avatar = await Jimp.read(tempUpload);
  if (!avatar) {
    throw httpError(500, "Image processing failed");
  }
  avatar.resize(250, 250);
  await avatar.writeAsync(resultUpload);

  await fs.unlink(tempUpload);

  const avatarURL = path.join("avatars", filename);

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL });
};

module.exports = {
  register: controllerWrapper(register),
  login: controllerWrapper(login),
  getCurrent: controllerWrapper(getCurrent),
  logout: controllerWrapper(logout),
  subscription: controllerWrapper(subscription),
  updateAvatar: controllerWrapper(updateAvatar),
};
