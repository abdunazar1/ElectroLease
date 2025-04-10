const { ownerValidation } = require("../validations/owner.validation");
const config = require("config");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const { errorHandler } = require("../helpers/error_handler");
const Owner = require("../models/Owners.model");
const emailService = require("../services/email.service");
const jwtOwnerService = require("../services/jwt.owner.service");
const { log } = require("winston");

const addNewOwner = async (req, res) => {
  try {
    const { error, value } = ownerValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }

    const {
      full_name,
      password_hash,
      passport_details,
      phone,
      address,
      email,
      is_active,
    } = value;

    const hashedPassword = bcrypt.hashSync(password_hash, 10);
    const activation_link = uuid.v4();

    const newOwner = await Owner.create({
      full_name,
      password_hash: hashedPassword,
      passport_details,
      phone,
      address,
      email,
      is_active,
      activation_link,
    });

    await emailService.sendActivationMail(
      newOwner.email,
      `${config.get("api_url")}/api/owner/activate/${activation_link}`
    );

    res.status(201).send({
      message: "Yangi owner qo'shildi.",
      owner: newOwner,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllOwners = async (req, res) => {
  try {
    const owners = await Owner.findAll();
    if (!owners.length) {
      return res.status(404).send({ message: "Owners topilmadi" });
    }

    res.status(200).send({ owners });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getOwnerById = async (req, res) => {
  try {
    const id = req.params.id;
    const owner = await Owner.findByPk(id);

    if (!owner) {
      return res.status(404).send({ message: "Owner topilmadi" });
    }

    res.status(200).send({ owner });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateOwnerById = async (req, res) => {
  try {
    const id = req.params.id;
    const { full_name, email, password, phone, address, is_active } = req.body;

    const owner = await Owner.findByPk(id);
    if (!owner) {
      return res.status(404).send({ message: "Owner topilmadi!" });
    }

    const updateData = {
      full_name,
      email,
      phone,
      address,
      is_active,
    };

    if (password) {
      updateData.password_hash = bcrypt.hashSync(password, 7);
    }

    await Owner.update(updateData, {
      where: { id },
      returning: true,
    });

    const updatedOwner = await Owner.findByPk(id);
    res.send({ message: "Owner yangilandi!", owner: updatedOwner });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteOwnerById = async (req, res) => {
  try {
    const id = req.params.id;

    const owner = await Owner.findByPk(id);
    if (!owner) {
      return res.status(404).send({ message: "Owner topilmadi" });
    }

    await Owner.destroy({ where: { id } });
    res.send({ message: "Owner o'chirildi", owner });
  } catch (error) {
    errorHandler(error, res);
  }
};

const loginOwner = async (req, res) => {
  try {
    const { email, password_hash } = req.body;
    const owner = await Owner.findOne({ where: { email } });

    if (!owner) {
      return res.status(400).send({ message: "Email yoki parol xato" });
    }

    const validPassword = bcrypt.compareSync(
      password_hash,
      owner.password_hash
    );

    if (!validPassword) {
      return res.status(400).send({ message: "Email yoki parol xato" });
    }

    const payload = {
      id: owner.id,
      email: owner.email,
      role: "owner",
    };

    const tokens = jwtOwnerService.generateToken(payload);
    await Owner.update(
      { refresh_token: tokens.refreshOwnerToken },
      { where: { id: owner.id } }
    );
    res.cookie("refreshOwnerToken", tokens.refreshOwnerToken, {
      httpOnly: true,
      maxAge: config.get("refresh_cookie_time"),
    });

    res.status(200).send({
      message: "Tizimga xush kelibsiz",
      accessOwnerToken: tokens.accessOwnerToken,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const logOutOwner = async (req, res) => {
  try {
    const { refreshOwnerToken } = req.cookies;
    console.log(req.cookies);
    if (!refreshOwnerToken) {
      return res
        .status(400)
        .send({ message: "Cookie-da refresh token topilmadi" });
    }

    const owner = await Owner.findOne({
      where: { refresh_token: refreshOwnerToken },
    });
    if (!owner) {
      return res
        .status(400)
        .send({ message: "Bunday tokenli owner topilmadi" });
    }

    await Owner.update({ refresh_token: null }, { where: { id: owner.id } });

    res.clearCookie("refreshToken");
    res.send({ message: "Owner tizimdan chiqdi", id: owner.id });
  } catch (error) {
    errorHandler(error, res);
  }
};
const refreshTokenOwner = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshOwnerToken;
    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "Cookie da refresh owner token topilmadi" });
    }

    const owner = await Owner.findOne({
      where: { refresh_token: refreshToken },
    });
    if (!owner) {
      return res
        .status(400)
        .send({ message: "Bunday tokenli foydalanuvchi topilmadi" });
    }

    const payload = {
      id: owner.id,
      email: owner.email,
      role: "owner",
    };

    const token = jwtOwnerService.generateToken(payload);

    await owner.update({ refresh_token: token.refreshOwnerToken });

    res.cookie("refreshOwnerToken", token.refreshOwnerToken, {
      httpOnly: true,
      maxAge: config.get("refresh_cookie_time"),
    });

    res.status(200).send({
      message: "Tokenlar yangilandi",
      accessToken: token.accessOwnerToken,
      
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const activateOwners = async (req, res) => {
  try {
    const owner = await Owner.findOne({ activation_link: req.params.link });

    if (!owner) {
      return res.status(404).send({ message: "Client topilmadi" });
    }
    owner.is_active = true;

    await owner.save();

    res.send({
      message: "Owner faolashtirildi",
      status: owner.is_active,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
module.exports = {
  addNewOwner,
  getAllOwners,
  getOwnerById,
  updateOwnerById,
  deleteOwnerById,
  loginOwner,
  logOutOwner,
  refreshTokenOwner,
  activateOwners,
};
