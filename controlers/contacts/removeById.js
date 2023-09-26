const { removeContact } = require("../../models/contacts");
const Contact = require("../../models/db-contacts")

const removeById = async (req, res, next) => {
    let contactId = req.params.contactId;
    // let result = await removeContact(id);
    let result = await Contact.findByIdAndDelete(contactId)

    if (result) {
      res.status(200).json({ message: "contact deleted" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
};

module.exports = removeById;
