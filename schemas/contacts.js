const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string()
    .pattern(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
    )
    .required(),
  favorite: Joi.boolean() 
});

const addFavorite = Joi.object({
  favorite: Joi.boolean().required() 
})

module.exports = { addSchema, addFavorite };
