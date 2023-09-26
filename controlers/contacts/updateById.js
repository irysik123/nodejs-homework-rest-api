const { updateContact } = require("../../models/contacts");
const Contact = require("../../models/db-contacts")

const updateById = async (req, res, next) => {
  let { name, email, phone } = req.body;
  let id = req.params.contactId;

  // let result = await updateContact(id, { name, email, phone });
  let result = await Contact.findByIdAndUpdate(id, {name, email,phone}, {new:true})

  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).json({ message: "Not found" });
  }
  // }
  next();
};

module.exports = updateById;
