// damages.validation.js
const Joi = require("joi");

const damageValidation = (data) => {
  const schema = Joi.object({
    contract_id: Joi.number().integer().required().messages({
      "number.base": `"contract_id" raqam bo'lishi kerak`,
      "any.required": `"contract_id" maydoni talab qilinadi`,
    }),
    damage_description: Joi.string().min(5).max(255).required().messages({
      "string.base": `"damage_description" matn bo'lishi kerak`,
      "string.empty": `"damage_description" bo'sh bo'lishi mumkin emas`,
      "string.min": `"damage_description" kamida 5 belgidan iborat bo'lishi kerak`,
      "any.required": `"damage_description" maydoni talab qilinadi`,
    }),
    damage_cost: Joi.number().precision(2).required().messages({
      "number.base": `"damage_cost" raqam bo'lishi kerak`,
      "any.required": `"damage_cost" maydoni talab qilinadi`,
    }),
    status: Joi.string()
      .valid("pending", "resolved", "rejected")
      .default("pending")
      .optional(),
  });

  return schema.validate(data);
};

module.exports = { damageValidation };
