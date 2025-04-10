// contracts.controller.js
const { errorHandler } = require("../helpers/error_handler");
const Client = require("../models/clients.model");
const Contracts = require("../models/contracts.model");
const Owner = require("../models/Owners.model");
const Status = require("../models/status.model");
const { contractValidation } = require("../validations/contracts.validation");

const addNewContract = async (req, res) => {
  try {
    const { error, value } = contractValidation(req.body);
    if (error) return errorHandler(error, res);

    const {
      client_id,
      owner_id,
      status_id,
      start_date,
      end_date,
      total_amount,
      deposit_paid,
      notes,
    } = value;

    const newContract = await Contracts.create({
      client_id,
      owner_id,
      status_id,
      start_date,
      end_date,
      total_amount,
      deposit_paid,
      notes,
    });

    res.status(201).send({
      message: "Yangi shartnoma qo'shildi.",
      contract: newContract,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllContracts = async (req, res) => {
  try {
    const contracts = await Contracts.findAll({
      include: { model: Status, attributes: ["name"] },
    });
    if (!contracts.length) {
      return res.status(404).send({ message: "Shartnomalar topilmadi" });
    }
    res.status(200).send({ contracts });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getContractById = async (req, res) => {
  try {
    const contract = await Contracts.findByPk(req.params.id);
    if (!contract) {
      return res.status(404).send({ message: "Shartnoma topilmadi" });
    }
    res.status(200).send({ contract });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateContractById = async (req, res) => {
  try {
    const { error, value } = contractValidation(req.body);
    if (error) return errorHandler(error, res);

    const {
      client_id,
      owner_id,
      status_id,
      start_date,
      end_date,
      total_amount,
      deposit_paid,
      notes,
    } = value;
    const contract = await Contracts.findByPk(req.params.id);
    if (!contract)
      return res.status(404).send({ message: "Shartnoma topilmadi!" });

    await Contracts.update(
      {
        client_id,
        owner_id,
        status_id,
        start_date,
        end_date,
        total_amount,
        deposit_paid,
        notes,
      },
      { where: { id: req.params.id } }
    );

    const updatedContract = await Contracts.findByPk(req.params.id);
    res.send({ message: "Shartnoma yangilandi!", contract: updatedContract });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteContractById = async (req, res) => {
  try {
    const contract = await Contracts.findByPk(req.params.id);
    if (!contract)
      return res.status(404).send({ message: "Shartnoma topilmadi" });

    await Contracts.destroy({ where: { contract_id: req.params.id } });

    res.send({ message: "Shartnoma o'chirildi", contract });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllMyContractsForClient = async (req, res) => {
  try {
    const clientId = req.user.id;
    const contracts = await Contracts.findAll({
      where: { client_id: clientId },
      include: [Client, Status, Owner],
    });

    res.send({ contracts });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewContract,
  getAllContracts,
  getContractById,
  updateContractById,
  deleteContractById,
  getAllMyContractsForClient,
};
