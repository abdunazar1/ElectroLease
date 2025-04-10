const Category = require("../models/category.model");
const { categoryValidation } = require("../validations/category.validation");

const addNewCategory = async (req, res) => {
  try {
    const { error, value } = categoryValidation(req.body);
    if (error) return errorHandler(error, res);

    const { name } = value;

    const newCategory = await Category.create({
      name,
    });

    res.status(201).send({
      message: "Yangi category qo'shildi.",
      category: newCategory,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    if (!categories.length) {
      return res.status(404).send({ message: "Category topilmadi" });
    }
    res.status(200).send({ categories });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).send({ message: "Category topilmadi" });
    }
    res.status(200).send({ category });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    const { error, value } = adminValidation(req.body);
    if (error) return errorHandler(error, res);

    const { name } = value;

    const category = await Category.findByPk(id);
    if (!category)
      return res.status(404).send({ message: "Category topilmadi!" });

    let updateData = {
      name,
    };

    await Category.update(updateData, { where: { id } });
    const updatedCategory = await Category.findByPk(id);
    res.send({ message: "Category yangilandi!", category: updatedCategory });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findByPk(id);
    if (!category)
      return res.status(404).send({ message: "Category topilmadi" });

    await Category.destroy({ where: { id } });

    res.send({ message: "Category o'chirildi", category });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
