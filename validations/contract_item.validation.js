const Joi = require("joi");

const contractItemValidation = (data) => {
  const schema = Joi.object({
    contract_id: Joi.number().integer().required().messages({
      "number.base": `"contract_id" raqam bo'lishi kerak`,
      "any.required": `"contract_id" maydoni talab qilinadi`,
    }),
    product_id: Joi.number().integer().required().messages({
      "number.base": `"product_id" raqam bo'lishi kerak`,
      "any.required": `"product_id" maydoni talab qilinadi`,
    }),
    quantity: Joi.number().integer().positive().required().messages({
      "number.base": `"quantity" musbat raqam bo'lishi kerak`,
      "any.required": `"quantity" maydoni talab qilinadi`,
    }),
    price: Joi.number().precision(2).positive().required().messages({
      "number.base": `"price" raqam bo'lishi kerak`,
      "any.required": `"price" maydoni talab qilinadi`,
    }),
  });

  return schema.validate(data);
};

module.exports = { contractItemValidation };
