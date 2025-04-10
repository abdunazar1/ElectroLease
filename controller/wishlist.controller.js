const { errorHandler } = require("../helpers/error_handler");
const Wishlist = require("../models/wishlist.model");
const { wishlistValidation } = require("../validations/wishlist.validation");

const addNewWishlistItem = async (req, res) => {
  try {
    const { error, value } = wishlistValidation(req.body);
    if (error) return errorHandler(error, res);

    const { client_id, product_id } = value;

    const newWishlistItem = await Wishlist.create({
      client_id,
      product_id,
      added_date: new Date(),
    });

    res.status(201).send({
      message: "Mahsulot xohishlar ro'yxatiga qo'shildi.",
      wishlist_item: newWishlistItem,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllWishlistItems = async (req, res) => {
  try {
    const wishlistItems = await Wishlist.findAll();
    if (!wishlistItems.length) {
      return res.status(404).send({ message: "Xohishlar ro'yxati bo'sh" });
    }
    res.status(200).send({ wishlistItems });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getWishlistByClientId = async (req, res) => {
  try {
    const clientId = req.params.client_id;

    const wishlistItems = await Wishlist.findAll({
      where: { client_id: clientId },
    });

    if (!wishlistItems.length) {
      return res.status(404).send({ message: "Xohishlar ro'yxati topilmadi" });
    }

    res.status(200).send({ wishlistItems });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteWishlistItem = async (req, res) => {
  try {
    const { wishlist_id } = req.params;

    const wishlistItem = await Wishlist.findByPk(wishlist_id);
    if (!wishlistItem) {
      return res.status(404).send({ message: "Xohishlar ro'yxati topilmadi" });
    }

    await Wishlist.destroy({ where: { wishlist_id } });

    res.status(200).send({
      message: "Mahsulot xohishlar ro'yxatidan o'chirildi.",
      wishlist_item: wishlistItem,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateWishlistItem = async (req, res) => {
  try {
    const { wishlist_id } = req.params;
    const { error, value } = wishlistValidation(req.body);
    if (error) return errorHandler(error, res);

    const { client_id, product_id } = value;

    const wishlistItem = await Wishlist.findByPk(wishlist_id);
    if (!wishlistItem) {
      return res.status(404).send({ message: "Xohishlar ro'yxati topilmadi" });
    }

    const updatedWishlistItem = await Wishlist.update(
      { client_id, product_id, added_date: new Date() },
      { where: { wishlist_id } }
    );

    res.status(200).send({
      message: "Xohishlar ro'yxati yangilandi.",
      updated_wishlist_item: updatedWishlistItem,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewWishlistItem,
  getAllWishlistItems,
  getWishlistByClientId,
  deleteWishlistItem,
  updateWishlistItem,
};
