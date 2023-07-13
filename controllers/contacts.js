const Contact = require("../models/contact");
const { httpError, controllerWrapper } = require("../helpers/index");

const getAll = async (req, res) => {
  const result = await Contact.find();
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
  const result = await Contact.create(req.body);
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
