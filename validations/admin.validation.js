const Joi = require("joi");

exports.adminValidation = (body) => {
  const schemaAdmins = Joi.object({
    username: Joi.string().min(3).max(20).required().messages({
      "string.empty": "Username bo'sh bo'lishi mumkin emas",
      "any.required": "Username kiriting",
    }),

    password_hash: Joi.string().required().messages({
      "string.empty": "Parol bo'sh bo'lishi mumkin emas",
      "any.required": "Parol kiriting",
    }),

    full_name: Joi.string().min(5).max(100).required().messages({
      "string.empty": "To'liq ismingizni kiriting",
      "any.required": "To'liq ismingizni kiriting",
    }),

    phone: Joi.string()
      .pattern(/^\d{2}-\d{3}-\d{2}-\d{2}$/)
      .required()
      .messages({
        "string.empty": "Telefon raqami bo'sh bo'lishi mumkin emas",
        "any.required": "Telefon raqamini kiriting",
      }),

    role: Joi.string().valid("admin", "superadmin").required().messages({
      "any.only": "Roli faqat 'admin' yoki 'superadmin' bo'lishi mumkin",
      "any.required": "Roli tanlanishi kerak",
    }),

    email: Joi.string().email().lowercase().messages({
      "string.empty": "Email bo'sh bo'lishi mumkin emas",
      "any.required": "Emailni kiriting",
    }),

  });

  return schemaAdmins.validate(body, {
    abortEarly: false,
  });
};
