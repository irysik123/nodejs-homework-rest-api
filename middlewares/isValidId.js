const { isValidObjectId } = require("mongoose");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    return res.status(400).json({"message": `${contactId} is not valid Id`});
  }
  next();
};

module.exports = isValidId;
