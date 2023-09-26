const { isValidObjectId } = require("mongoose");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json(`${id} is not valid Id`);
  }
  next();
};

module.exports = isValidId;
