const Joi = require("joi");

exports.clientValidation = (body) => {
  const schema = Joi.object({
    full_name: Joi.string().min(5).max(100).required().messages({
      "string.empty": "To'liq ismingizni kiriting",
      "string.min": "Ism juda qisqa",
      "string.max": "Ism juda uzun",
      "any.required": "To'liq ism majburiy",
    }),

    passport: Joi.string().min(8).max(20).required().messages({
      "string.empty": "Pasport ma'lumotlarini kiriting",
      "any.required": "Pasport ma'lumotlari majburiy",
    }),

    contact_phone: Joi.string()
      .pattern(/^\d{2}-\d{3}-\d{2}-\d{2}$/)
      .required()
      .messages({
        "string.empty": "Telefon raqami bo'sh bo'lishi mumkin emas",
        "string.pattern.base":
          "Telefon raqam formati noto'g'ri. Masalan: 90-123-45-67",
        "any.required": "Telefon raqami majburiy",
      }),

    email: Joi.string().email().required().messages({
      "string.email": "Email noto‘g'ri kiritilgan",
      "string.empty": "Email bo'sh bo'lishi mumkin emas",
      "any.required": "Email majburiy",
    }),

    address: Joi.string().min(10).max(200).messages({
      "string.min": "Manzil juda qisqa",
      "string.max": "Manzil juda uzun",
    }),


    password_hash: Joi.string().min(6).required().messages({
      "string.empty": "Parolni kiriting",
      "string.min": "Parol kamida 6 ta belgidan iborat bo‘lishi kerak",
      "any.required": "Parol majburiy",
    }),

    is_active: Joi.boolean().default(false),
  });

  return schema.validate(body, { abortEarly: false });
};
