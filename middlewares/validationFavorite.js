const validationFavorite = (schema) => {
  return (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "missing field favorite" });
    }
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 400;
      next(error);
      return;
    }
    next();
  };
};

module.exports = validationFavorite;
