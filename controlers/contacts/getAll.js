
const Contact = require("../../models/db-contacts")

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  const {page = 1, limit = 20} = req.query;
  const skip = (page - 1) * limit;
  let contacts = await Contact.find({owner}, {skip, limit}).populate("owner", "email");
  res.status(200).json(contacts);
};

module.exports = getAll;
