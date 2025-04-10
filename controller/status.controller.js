const { errorHandler } = require("../helpers/error_handler");
const Status = require("../models/status.model");
const { statusValidation } = require("../validations/status.validation");

const addNewStatus = async (req, res) => {
  try {
    const { error, value } = statusValidation(req.body);
    if (error) return errorHandler(error, res);

    const { name } = value;

    const newStatus = await Status.create({
      name,
    });

    res.status(201).send({
      message: "Yangi status qo'shildi.",
      status: newStatus,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllStatus = async (req, res) => {
  try {
    const status = await Status.findAll();
    if (!status.length) {
      return res.status(404).send({ message: "Status topilmadi" });
    }
    res.status(200).send({ status });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getStatusById = async (req, res) => {
  try {
    const status = await Status.findByPk(req.params.id);
    if (!status) {
      return res.status(404).send({ message: "Status topilmadi" });
    }
    res.status(200).send({ status });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateStatusById = async (req, res) => {
  try {
    const id = req.params.id;
    const { error, value } = adminValidation(req.body);
    if (error) return errorHandler(error, res);

    const { name } = value;

    

    

    const status = await Status.findByPk(id);
    if (!status) return res.status(404).send({ message: "Status topilmadi!" });

    await Status.update({ name: value.name }, { where: { id } });


    await Status.update(updateData, { where: { id } });
    const updatedStatus = await Status.findByPk(id);
    res.send({ message: "Status yangilandi!", status: updatedStatus });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteStatusById = async (req, res) => {
  try {
    const id = req.params.id;
    const status = await Status.findByPk(id);
    if (!status) return res.status(404).send({ message: "Status topilmadi" });

    await Status.destroy({ where: { id } });

    res.send({ message: "Status o'chirildi", status });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewStatus,
  getAllStatus,
  getStatusById,
  updateStatusById,
  deleteStatusById,
};
