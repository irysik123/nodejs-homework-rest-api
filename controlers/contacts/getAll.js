
const Contact = require("../../models/db-contacts")

const getAll = async (req, res, next) => {
  let contacts = await Contact.find();
  res.status(200).json(contacts);
};

module.exports = getAll;
