const Joi = require("joi");

const productValidation = (data) => {
  const schema = Joi.object({
    category_id: Joi.number().integer().required(),
    owner_id: Joi.number().integer().required(),
    name: Joi.string().max(255).required(),
    description: Joi.string().allow("", null),
    rental_price_per_day: Joi.number().precision(2).required(),
    deposit_amount: Joi.number().precision(2).required(),
    purchase_date: Joi.date().required(),
    purchase_price: Joi.number().precision(2),
    serial_number: Joi.string().max(100),
    image_url: Joi.string(),
    status: Joi.string().valid("available", "rented", "under maintenance"),
  });

  return schema.validate(data);
};

module.exports = { productValidation };
