const express = require("express");

const { ctrlWrapper } = require("../../middlewares");

const ctrl = require("../../controlers/users/users");

const { validation, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/register",
  validation(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

router.post("/login", validation(schemas.loginSchema), ctrlWrapper(ctrl.login));

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout)

module.exports = router;
