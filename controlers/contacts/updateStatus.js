const Contact = require("../../models/db-contacts")

const updateStatus = async (req, res, next) => {
    let {favorite} = req.body;
    let id = req.params.contactId;

    let result = await Contact.findByIdAndUpdate(id, {favorite}, {new: true})

    if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "Not found" });
      }
      next();
}

module.exports = updateStatus;