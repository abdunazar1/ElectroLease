// payments.validation.js
const Joi = require("joi");

const paymentValidation = (data) => {
  const schema = Joi.object({
    contract_id: Joi.number().integer().required().messages({
      "number.base": `"contract_id" raqam bo'lishi kerak`,
      "any.required": `"contract_id" maydoni talab qilinadi`,
    }),
    amount: Joi.number().precision(2).required().messages({
      "number.base": `"amount" raqam bo'lishi kerak`,
      "any.required": `"amount" maydoni talab qilinadi`,
    }),
    payment_type: Joi.string()
      .valid("cash", "card", "transfer")
      .required()
      .messages({
        "any.only": `"payment_type" faqat 'cash', 'card', yoki 'transfer' bo'lishi kerak`,
        "any.required": `"payment_type" maydoni talab qilinadi`,
      }),
    receipt_number: Joi.string().max(50).allow("").optional(),
    status: Joi.string()
      .valid("pending", "completed", "failed")
      .default("pending")
      .optional(),
  });

  return schema.validate(data);
};

module.exports = { paymentValidation };
