const contacts = require("../models/contacts");
const { httpError, controllerWrapper } = require("../helpers/index");

const getAll = async (req, res) => {
  const result = await contacts.listContacts();
  if (!result) {
    throw httpError(404, "Not found");
  }
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.getContactById(id);
  if (!result) {
    throw httpError(404, "Not found");
  }
  res.json(result);
};

const postContact = async (req, res) => {
  const data = req.body;
  const result = await contacts.addContact(data);
  return res.status(201).json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.removeContact(id);
  if (!result) {
    throw httpError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};

const putContact = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await contacts.updateContact(id, data);
  if (!result) {
    throw httpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  getAll: controllerWrapper(getAll),
  getById: controllerWrapper(getById),
  postContact: controllerWrapper(postContact),
  deleteContact: controllerWrapper(deleteContact),
  putContact: controllerWrapper(putContact),
};
