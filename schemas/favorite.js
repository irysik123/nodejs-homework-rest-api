const Joi = require("joi");

const favoriteSchema = Joi.object({
    favorite: Joi.boolean().messages({
        "any.required": "missing field favorite"
      })
})

module.exports = favoriteSchema;