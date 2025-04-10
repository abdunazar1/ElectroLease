const { adminValidation } = require("../validations/admin.validation");
const config = require("config");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const jwtService = require("../services/jwt.service");
const { errorHandler } = require("../helpers/error_handler");
const Admin = require("../models/Admin.model");

const addNewAdmin = async (req, res) => {
  try {
    const { error, value } = adminValidation(req.body);
    if (error) return errorHandler(error, res);

    const {
      username,
      password_hash,
      full_name,
      phone,
      role,
      email,
      is_active,
    } = value;

    const hashedPassword = bcrypt.hashSync(password_hash, 10);
    const activation_link = uuid.v4();

    const newAdmin = await Admin.create({
      username,
      password_hash: hashedPassword,
      full_name,
      phone,
      role,
      email,
      is_active,
      activation_link,
    });

    res.status(201).send({
      message: "Yangi admin qo'shildi.",
      admin: newAdmin,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll();
    if (!admins.length) {
      return res.status(404).send({ message: "Adminlar topilmadi" });
    }
    res.status(200).send({ admins });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.params.id);
    if (!admin) {
      return res.status(404).send({ message: "Admin topilmadi" });
    }
    res.status(200).send({ admin });
  } catch (error) {
    errorHandler(error, res);
  }
};
const updateAdminById = async (req, res) => {
  try {
    const id = req.params.id;
    const { error, value } = adminValidation(req.body);
    if (error) return errorHandler(error, res);

    const {
      username,
      full_name,
      email,
      password_hash,
      phone,
      role,
      is_active,
    } = value;

    const admin = await Admin.findByPk(id);
    if (!admin) return res.status(404).send({ message: "Admin topilmadi!" });

    let updateData = {
      username,
      full_name,
      email,
      phone,
      role,
      is_active,
    };

    if (password_hash) {
      updateData.password_hash = bcrypt.hashSync(password_hash, 10);
    }
    await Admin.update(updateData, { where: { id } });
    const updatedAdmin = await Admin.findByPk(id);
    res.send({ message: "Admin yangilandi!", admin: updatedAdmin });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteAdminById = async (req, res) => {
  try {
    const id = req.params.id;
    const admin = await Admin.findByPk(id);
    if (!admin) return res.status(404).send({ message: "Admin topilmadi" });

    await Admin.destroy({ where: { id } });

    res.send({ message: "Admin o'chirildi", admin });
  } catch (error) {
    errorHandler(error, res);
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password_hash } = req.body;
    const admin = await Admin.findOne({ where: { email } });

    if (!admin) {
      return res.status(400).send({ message: "Email yoki parol noto'g'ri" });
    }

    const validPassword = bcrypt.compareSync(
      password_hash,
      admin.password_hash
    );
    if (!validPassword) {
      return res.status(400).send({ message: "Email yoki parol noto'g'ri" });
    }

    const payload = {
      id: admin.id,
      email: admin.email,
      role: admin.role,
    };

    const tokens = jwtService.generateToken(payload);

    await Admin.update(
      { refresh_token: tokens.refreshToken },
      { where: { id: admin.id } }
    );
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("refresh_cookie_time"),
    });


    res.status(200).send({
      message: "Tizimga xush kelibsiz",
      accessToken: tokens.accessToken,
      
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const logOutAdmin = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(400).send({ message: "Token topilmadi" });
    }

    const admin = await Admin.findOne({
      where: { refresh_token: refreshToken },
    });

    if (!admin) {
      return res.status(400).send({ message: "Bunday admin topilmadi" });
    }

    await Admin.update({ refresh_token: null }, { where: { id: admin.id } });

    res.clearCookie("refreshToken");
    res.send({ message: "Admin tizimdan chiqdi", id: admin.id });
  } catch (error) {
    errorHandler(error, res);
  }
};

const refreshTokenAdmin = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    
    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "Cookie da refresh token topilmadi" });
    }

    const admin = await Admin.findOne({
      where: { refresh_token: refreshToken },
    });
    if (!admin) {
      return res
        .status(400)
        .send({ messgae: "Bunday tokeni Foydalnuvchi topilmadi" });
    }
    const payload = {
      id: admin.id,
      email: admin.email,
      role: admin.role,
    };

    const token = jwtService.generateToken(payload);
    
    await admin.update({ refresh_token: token.refreshToken });

    res.cookie("refreshToken", token.refreshToken, {
      httpOnly: true,
      maxAge: config.get("refresh_cookie_time"),
    });
    res.status(200).send({
      message: "Tokenlar Yangilandi",
      accessToken: token.accessToken,
      
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewAdmin,
  getAllAdmins,
  getAdminById,
  updateAdminById,
  deleteAdminById,
  loginAdmin,
  logOutAdmin,
  refreshTokenAdmin,
};
