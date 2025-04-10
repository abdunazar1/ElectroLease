// damages.controller.js
const { errorHandler } = require("../helpers/error_handler");
const Damage = require("../models/damages.model");
const { damageValidation } = require("../validations/damages.validation");

const addNewDamage = async (req, res) => {
  try {
    const { error, value } = damageValidation(req.body);
    if (error) return errorHandler(error, res);

    const { contract_id, damage_description, damage_cost, status } = value;

    const newDamage = await Damage.create({
      contract_id,
      damage_description,
      damage_cost,
      status,
    });

    res.status(201).send({
      message: "Yangi zarar qo'shildi.",
      damage: newDamage,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllDamages = async (req, res) => {
  try {
    const damages = await Damage.findAll();
    if (!damages.length) {
      return res.status(404).send({ message: "Hech qanday zarar topilmadi." });
    }
    res.status(200).send({ damages });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getDamageById = async (req, res) => {
  try {
    const damage = await Damage.findByPk(req.params.id);
    if (!damage) {
      return res.status(404).send({ message: "Zarar topilmadi." });
    }
    res.status(200).send({ damage });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateDamageById = async (req, res) => {
  try {
    const id = req.params.id;
    const { error, value } = damageValidation(req.body);
    if (error) return errorHandler(error, res);

    const { damage_description, damage_cost, status } = value;

    const damage = await Damage.findByPk(id);
    if (!damage) return res.status(404).send({ message: "Zarar topilmadi!" });

    await Damage.update(
      { damage_description, damage_cost, status },
      { where: { id } }
    );
    const updatedDamage = await Damage.findByPk(id);

    res.send({ message: "Zarar yangilandi!", damage: updatedDamage });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteDamageById = async (req, res) => {
  try {
    const id = req.params.id;
    const damage = await Damage.findByPk(id);
    if (!damage) return res.status(404).send({ message: "Zarar topilmadi" });

    await Damage.destroy({ where: { id } });

    res.send({ message: "Zarar o'chirildi", damage });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewDamage,
  getAllDamages,
  getDamageById,
  updateDamageById,
  deleteDamageById,
};
