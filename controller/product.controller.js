const { errorHandler } = require("../helpers/error_handler");
const Category = require("../models/category.model");
const Owner = require("../models/Owners.model");
const Product = require("../models/Product.model");
const { productValidation } = require("../validations/product.validation");

const addNewProduct = async (req, res) => {
  try {
    const { error, value } = productValidation(req.body);
    if (error) return res.status(400).send({ message: error.message });

    const newProduct = await Product.create(value);

    res.status(201).send({
      message: "Yangi mahsulot qo'shildi.",
      product: newProduct,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ include: Category });
    res.send({ products });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product)
      return res.status(404).send({ message: "Mahsulot topilmadi." });

    res.send({ product });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const { error, value } = productValidation(req.body);
    if (error) return res.status(400).send({ message: error.message });

    const product = await Product.findByPk(id);
    if (!product)
      return res.status(404).send({ message: "Mahsulot topilmadi." });

    await Product.update(value, { where: { product_id: id } });

    const updated = await Product.findByPk(id);
    res.send({ message: "Mahsulot yangilandi.", product: updated });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByPk(id);
    if (!product)
      return res.status(404).send({ message: "Mahsulot topilmadi." });

    await Product.destroy({ where: { product_id: id } });
    res.send({ message: "Mahsulot o'chirildi.", product });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
