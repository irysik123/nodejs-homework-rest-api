const { listContacts } = require("../../models/contacts");

const Contact = require("../../models/db-contacts")

const getAll = async (req, res, next) => {
  // let contacts = await listContacts();
  // res.status(200).json(contacts);
  const result = await Contact.find();
  res.json(result);
};

module.exports = getAll;
