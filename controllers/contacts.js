const { Contact } = require("../models/contact");
const { httpError, controllerWrapper } = require("../helpers/index");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  let result;

  if (favorite) {
    result = await Contact.find(
      { owner, favorite: true },
      "-createdAt -updatedAt",
      {
        skip,
        limit,
      }
    );
  } else {
    result = await Contact.find({ owner }, "-createdAt -updatedAt", {
      skip,
      limit,
    });
  }

  if (!result) {
    throw httpError(404, "Not found");
  }
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw httpError(404, "Not found");
  }
  res.json(result);
};

const postContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  return res.status(201).json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw httpError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};

const putContact = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await Contact.findByIdAndUpdate(id, data, { new: true });
  if (!result) {
    throw httpError(404, "Not found");
  }
  res.json(result);
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await Contact.findByIdAndUpdate(id, data, { new: true });
  if (!result) {
    throw httpError(404, "Not found");
  }
  if (!data) {
    throw httpError(400, "missing field favorite");
  }
  res.json(result);
};

module.exports = {
  getAll: controllerWrapper(getAll),
  getById: controllerWrapper(getById),
  postContact: controllerWrapper(postContact),
  deleteContact: controllerWrapper(deleteContact),
  putContact: controllerWrapper(putContact),
  updateFavorite: controllerWrapper(updateFavorite),
};
