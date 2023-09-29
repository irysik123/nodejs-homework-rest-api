const Contact = require("../../models/db-contacts")

const add = async (req, res, next) => {
  let { name, email, phone } = req.body;

  let newContact = await Contact.create({ name, email, phone, favorite: "false" })
  res.status(201).json(newContact);
};

module.exports = add;
