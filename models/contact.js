const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "contact",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const addContacts = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string()
    .pattern(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
    )
    .required(),
  favorite: Joi.boolean(),
});

const addFavorite = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = { addContacts, addFavorite };

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

module.exports = { schemas, Contact };
