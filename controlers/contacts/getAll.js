const Contact = require("../../models/db-contacts");

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  let contacts = await Contact.find({ owner }).populate(
    "owner",
    "email"
  );
  res.status(200).json(contacts);
};

module.exports = getAll;
