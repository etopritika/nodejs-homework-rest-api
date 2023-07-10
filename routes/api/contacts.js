const express = require("express");
const router = express.Router();
const {
  getAll,
  getById,
  postContact,
  deleteContact,
  putContact,
} = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares");
const { addSchema } = require("../../schemas/contacts");

router.get("/", getAll);

router.get("/:id", getById);

router.post("/", validateBody(addSchema), postContact);

router.delete("/:id", deleteContact);

router.put("/:id", validateBody(addSchema), putContact);

module.exports = router;
