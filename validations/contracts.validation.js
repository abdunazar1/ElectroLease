const Joi = require("joi");

const contractValidation = (data) => {
  const schema = Joi.object({
    client_id: Joi.number().integer().required().messages({
      "number.base": `"Client ID" butun son bo'lishi kerak`,
      "any.required": `"Client ID" maydoni majburiy`,
    }),
    owner_id: Joi.number().integer().required().messages({
      "number.base": `"Owner ID" butun son bo'lishi kerak`,
      "any.required": `"Owner ID" maydoni majburiy`,
    }),
    status_id: Joi.number().integer().required().messages({
      "number.base": `"Status ID" butun son bo'lishi kerak`,
      "any.required": `"Status ID" maydoni majburiy`,
    }),
    start_date: Joi.date().required().messages({
      "date.base": `"Start Date" to'g'ri formatda bo'lishi kerak`,
      "any.required": `"Start Date" maydoni majburiy`,
    }),
    end_date: Joi.date().required().messages({
      "date.base": `"End Date" to'g'ri formatda bo'lishi kerak`,
      "any.required": `"End Date" maydoni majburiy`,
    }),
    total_amount: Joi.number().precision(2).required().messages({
      "number.base": `"Total Amount" to'g'ri formatda bo'lishi kerak`,
      "any.required": `"Total Amount" maydoni majburiy`,
    }),
    deposit_paid: Joi.number().precision(2).optional(),
    notes: Joi.string().optional(),
  });

  return schema.validate(data);
};

module.exports = { contractValidation };
