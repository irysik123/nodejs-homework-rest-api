const express = require("express");

const { validation, ctrlWrapper, isValidId, validationFavorite } = require("../../middlewares");
const { contactSchema, favoriteSchema } = require("../../schemas");
const { contacts: cntr } = require("../../controlers");

const validateMiddleware = validation(contactSchema)

const router = express.Router();

router.get("/", ctrlWrapper(cntr.getAll));

router.get("/:contactId", isValidId, ctrlWrapper(cntr.getById));

router.post("/", validateMiddleware, ctrlWrapper(cntr.add));

router.delete("/:contactId", isValidId, ctrlWrapper(cntr.removeById));

router.put("/:contactId", isValidId, validateMiddleware, ctrlWrapper(cntr.updateById));

router.patch("/:contactId/favorite", isValidId, validationFavorite(favoriteSchema), ctrlWrapper(cntr.updateStatus))

module.exports = router;
