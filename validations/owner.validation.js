const Joi = require("joi");

exports.ownerValidation = (body) => {
  const schemaOwners = Joi.object({
    full_name: Joi.string().min(5).max(100).required().messages({
      "string.empty": "To'liq ismingizni kiriting",
      "any.required": "To'liq ismingizni kiriting",
    }),

    password_hash: Joi.string().required().messages({
      "string.empty": "Parol bo'sh bo'lishi mumkin emas",
      "any.required": "Parol kiriting",
    }),

    phone: Joi.string()
      .pattern(/^\d{2}-\d{3}-\d{2}-\d{2}$/)
      .required()
      .messages({
        "string.empty": "Telefon raqami bo'sh bo'lishi mumkin emas",
        "any.required": "Telefon raqamini kiriting",
      }),

    email: Joi.string().email().lowercase().required().messages({
      "string.empty": "Email bo'sh bo'lishi mumkin emas",
      "any.required": "Emailni kiriting",
    }),
    passport_details: Joi.string().required(),

    address: Joi.string().min(10).max(100).required().messages({
      "string.empty": "Manzilingizni  kiriting",
      "any.required": "To'liq manzilingizni kiriting",
    }),

    is_active: Joi.boolean().default(false),
  });

  return schemaOwners.validate(body, {
    abortEarly: false,
  });
};
