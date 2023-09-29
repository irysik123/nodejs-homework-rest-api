const express = require("express");

const { validation, ctrlWrapper, isValidId, validationFavorite, authenticate } = require("../../middlewares");
const { contactSchema, favoriteSchema } = require("../../schemas");
const { contacts: cntr } = require("../../controlers");

const validateMiddleware = validation(contactSchema)

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(cntr.getAll));

router.get("/:contactId", authenticate, isValidId, ctrlWrapper(cntr.getById));

router.post("/", authenticate, validateMiddleware, ctrlWrapper(cntr.add));

router.delete("/:contactId", authenticate, isValidId, ctrlWrapper(cntr.removeById));

router.put("/:contactId", authenticate, isValidId, validateMiddleware, ctrlWrapper(cntr.updateById));

router.patch("/:contactId/favorite", authenticate, isValidId, validationFavorite(favoriteSchema), ctrlWrapper(cntr.updateStatus))

module.exports = router;
