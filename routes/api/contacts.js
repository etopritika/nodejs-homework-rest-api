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
const { validateBody, isValidId } = require("../../middlewares");
const { addSchema, addFavorite } = require("../../schemas/contacts");

router.get("/", getAll);

router.get("/:id", isValidId, getById);

router.post("/", validateBody(addSchema), postContact);

router.delete("/:id", isValidId, deleteContact);

router.put("/:id", isValidId, validateBody(addSchema), putContact);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(addFavorite),
  updateFavorite
);

module.exports = router;
