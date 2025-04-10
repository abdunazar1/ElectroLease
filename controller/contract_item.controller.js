const { errorHandler } = require("../helpers/error_handler");
const ContractItem = require("../models/contract_item.model");
const Product = require("../models/Product.model");
const Contract = require("../models/contracts.model");
const {
  contractItemValidation,
} = require("../validations/contract_item.validation");

const addNewContractItem = async (req, res) => {
  try {
    const { error, value } = contractItemValidation(req.body);
    if (error) return errorHandler(error, res);

    const { contract_id, product_id, quantity, price } = value;

    const newContractItem = await ContractItem.create({
      contract_id,
      product_id,
      quantity,
      price,
    });

    res.status(201).send({
      message: "Yangi contract item qo'shildi.",
      contract_item: newContractItem,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllContractItems = async (req, res) => {
  try {
    const contractItems = await ContractItem.findAll({
      include: [
        {
          model: Product,
          attributes: ["product_id", "name", "description"],
        },
        {
          model: Contract,
          attributes: ["id", "start_date", "end_date"],
        },
      ],
    });
    if (!contractItems.length) {
      return res
        .status(404)
        .send({ message: "Hech qanday contract item topilmadi." });
    }
    res.status(200).send({ contract_items: contractItems });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getContractItemById = async (req, res) => {
  try {
    const contractItem = await ContractItem.findByPk(req.params.id);
    if (!contractItem) {
      return res.status(404).send({ message: "Contract item topilmadi." });
    }
    res.status(200).send({ contract_item: contractItem });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateContractItemById = async (req, res) => {
  try {
    const id = req.params.id;
    const { error, value } = contractItemValidation(req.body);
    if (error) return errorHandler(error, res);

    const { product_id, quantity, price } = value;

    const contractItem = await ContractItem.findByPk(id);
    if (!contractItem)
      return res.status(404).send({ message: "Contract item topilmadi!" });

    await ContractItem.update(
      { product_id, quantity, price },
      { where: { id } }
    );
    const updatedContractItem = await ContractItem.findByPk(id);

    res.send({
      message: "Contract item yangilandi!",
      contract_item: updatedContractItem,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteContractItemById = async (req, res) => {
  try {
    const id = req.params.id;
    const contractItem = await ContractItem.findByPk(id);
    if (!contractItem)
      return res.status(404).send({ message: "Contract item topilmadi" });

    await ContractItem.destroy({ where: { id } });

    res.send({
      message: "Contract item o'chirildi",
      contract_item: contractItem,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewContractItem,
  getAllContractItems,
  getContractItemById,
  updateContractItemById,
  deleteContractItemById,
};
