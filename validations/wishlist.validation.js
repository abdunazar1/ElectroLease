const Joi = require("joi");

const wishlistValidation = (data) => {
  const schema = Joi.object({
    client_id: Joi.number().required(),
    product_id: Joi.number().required(),
  });

  return schema.validate(data);
};

module.exports = { wishlistValidation };
