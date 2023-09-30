const Contact = require("../../models/db-contacts");

const add = async (req, res, next) => {
  const { _id: owner } = req.user;
  let { name, email, phone } = req.body;

  let newContact = await Contact.create({
    name,
    email,
    phone,
    favorite: "false",
    owner,
  });
  res.status(201).json(newContact);
};

module.exports = add;
