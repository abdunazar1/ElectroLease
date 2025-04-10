const Joi = require("joi");

const categoryValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
      "string.empty": `"Name" maydoni bo'sh bo'lishi mumkin emas`,
      "string.min": `"Name" maydoni kamida 3 belgidan iborat bo'lishi kerak`,
    }),
  });

  return schema.validate(data);
};

module.exports = { categoryValidation };
