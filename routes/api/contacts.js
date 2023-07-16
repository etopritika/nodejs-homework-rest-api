const express = require("express");
const router = express.Router();
const {
  getAll,
  getById,
  postContact,
  deleteContact,
  putContact,
  updateFavorite,
} = require("../../controllers/contacts");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/contact");
const { addContacts, addFavorite } = schemas;

router.get("/", authenticate, getAll);

router.get("/:id", authenticate, isValidId, getById);

router.post("/", authenticate, validateBody(addContacts), postContact);

router.delete("/:id", authenticate, isValidId, deleteContact);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(addContacts),
  putContact
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(addFavorite),
  updateFavorite
);

module.exports = router;
