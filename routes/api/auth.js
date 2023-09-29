const express = require("express");
const { route } = require("express/lib/application");
const { ctrlWrapper } = require("../../middlewares");

const ctrl = require("../../controlers/users/users");

const { validation } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/register",
  validation(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

router.post("/login", validation(schemas.loginSchema), ctrlWrapper(ctrl.login))

module.exports = router;
