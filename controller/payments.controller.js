// payments.controller.js
const Payment = require("../models/payments.model");
const { paymentValidation } = require("../validations/payments.validation");

const addNewPayment = async (req, res) => {
  try {
    const { error, value } = paymentValidation(req.body);
    if (error) return errorHandler(error, res);

    const { contract_id, amount, payment_type, receipt_number, status } = value;

    const newPayment = await Payment.create({
      contract_id,
      amount,
      payment_type,
      receipt_number,
      status,
    });

    res.status(201).send({
      message: "Yangi to'lov qo'shildi.",
      payment: newPayment,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll();
    if (!payments.length) {
      return res.status(404).send({ message: "Hech qanday to'lov topilmadi." });
    }
    res.status(200).send({ payments });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) {
      return res.status(404).send({ message: "To'lov topilmadi." });
    }
    res.status(200).send({ payment });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updatePaymentById = async (req, res) => {
  try {
    const id = req.params.id;
    const { error, value } = paymentValidation(req.body);
    if (error) return errorHandler(error, res);

    const { amount, payment_type, receipt_number, status } = value;

    const payment = await Payment.findByPk(id);
    if (!payment) return res.status(404).send({ message: "To'lov topilmadi!" });

    await Payment.update(
      { amount, payment_type, receipt_number, status },
      { where: { id } }
    );
    const updatedPayment = await Payment.findByPk(id);

    res.send({ message: "To'lov yangilandi!", payment: updatedPayment });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deletePaymentById = async (req, res) => {
  try {
    const id = req.params.id;
    const payment = await Payment.findByPk(id);
    if (!payment) return res.status(404).send({ message: "To'lov topilmadi" });

    await Payment.destroy({ where: { id } });

    res.send({ message: "To'lov o'chirildi", payment });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewPayment,
  getAllPayments,
  getPaymentById,
  updatePaymentById,
  deletePaymentById,
};
