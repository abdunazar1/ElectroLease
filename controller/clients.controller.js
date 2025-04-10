const config = require("config");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const { errorHandler } = require("../helpers/error_handler");
const Client = require("../models/clients.model");
const { clientValidation } = require("../validations/clients.validation");
const emailService = require("../services/email.service");
const jwtClientService = require("../services/jwt.client.service");

const addNewClient = async (req, res) => {
  try {
    const { error, value } = clientValidation(req.body);

    if (error) return errorHandler(error, res);

    const {
      full_name,
      passport,
      contact_phone,
      email,
      address,
      password_hash,
    } = value;

    const hashedPassword = bcrypt.hashSync(password_hash, 10);
    const activation_link = uuid.v4();

    const newClient = await Client.create({
      full_name,
      passport,
      contact_phone,
      email,
      address,
      password_hash: hashedPassword,
      activation_link,
    });
    await emailService.sendActivationMail(
      newClient.email,
      `${config.get("api_url")}/api/client/activate/${activation_link}`
    );
    res.status(201).send({
      message:
        "Yangi client qo'shildi. Accountni faollashtirish uchun emailga o'ting",
      client: newClient,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllClients = async (req, res) => {
  try {
    const clients = await Client.findAll();
    if (!clients.length) {
      return res
        .status(404)
        .send({ message: "Client foydalanuvchilar topilmadi" });
    }
    res.status(200).send({ clients });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getClientById = async (req, res) => {
  try {
    const id = req.params.id;
    const client = await Client.findByPk(id);
    if (!client) return res.status(404).send({ message: "Client topilmadi" });

    res.status(200).send({ client });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateClientById = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      full_name,
      passport,
      contact_phone,
      email,
      address,
      password_hash,
    } = req.body;

    const client = await Client.findByPk(id);
    if (!client) return res.status(404).send({ message: "Client topilmadi!" });

    const updateData = {
      full_name,
      passport,
      contact_phone,
      email,
      address,
    };

    if (password_hash) {
      updateData.password_hash = bcrypt.hashSync(password_hash, 10);
    }

    await Client.update(updateData, {
      where: { id },
      returning: true,
    });

    const updatedClient = await Client.findByPk(id);
    res.send({ message: "Client yangilandi!", client: updatedClient });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteClientById = async (req, res) => {
  try {
    const id = req.params.id;

    const client = await Client.findByPk(id);
    if (!client) return res.status(404).send({ message: "Client topilmadi" });

    await Client.destroy({ where: { id } });

    res.send({ message: "Client o'chirildi", client });
  } catch (error) {
    errorHandler(error, res);
  }
};
const loginClient = async (req, res) => {
  try {
    const { email, password_hash } = req.body;
    const client = await Client.findOne({ where: { email } });

    if (!client) {
      return res.status(400).send({ message: "Email yoki parol xato" });
    }

    const validPassword = bcrypt.compareSync(
      password_hash,
      client.password_hash
    );
    if (!validPassword) {
      return res.status(400).send({ message: "Email yoki parol xato" });
    }

    const payload = {
      id: client.id,
      email: client.email,
      role: "client",
    };

    const tokens = jwtClientService.generateToken(payload);

    await Client.update(
      { refresh_token: tokens.refreshClientToken },
      { where: { id: client.id } }
    );
    res.cookie("refreshClientToken", tokens.refreshClientToken, {
      httpOnly: true,
      maxAge: config.get("refresh_cookie_time"),
    });

    res.status(200).send({
      message: "Tizimga xush kelibsiz",
      accessClientToken: tokens.accessClientToken,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const logOutClient = async (req, res) => {
  try {
    const { refreshClientToken } = req.cookies;

    if (!refreshClientToken) {
      return res.status(400).send({ message: "Token topilmadi" });
    }

    const client = await Client.findOne({
      where: { refresh_token: refreshClientToken },
    });

    if (!client) {
      return res.status(400).send({ message: "Bunday Client topilmadi" });
    }

    await Client.update({ refresh_token: null }, { where: { id: client.id } });

    res.clearCookie("refreshClientToken");
    res.send({ message: "Client tizimdan chiqdi", id: client.id });
  } catch (error) {
    errorHandler(error, res);
  }
};

const refreshTokenClient = async (req, res) => {
  try {
    const { refreshClientToken } = req.cookies;
    if (!refreshClientToken) {
      return res
        .status(400)
        .send({ message: "Cookie-da refresh token topilmadi" });
    }

    const decoded = await jwtClientService.verifyRefreshClientToken(
      refreshClientToken
    );

    const client = await Client.findOne({
      where: { id: decoded.id, refresh_token: refreshClientToken },
    });

    if (!client) {
      return res
        .status(400)
        .send({ message: "Bunday tokenli client topilmadi" });
    }

    const payload = {
      id: client.id,
      email: client.email,
      role: "client",
    };

    const tokens = jwtClientService.generateToken(payload);

    await Client.update(
      { refresh_token: tokens.refreshClientToken },
      { where: { id: client.id } }
    );

    res.cookie("refreshToken", tokens.refreshClientToken, {
      httpOnly: true,
      maxAge: config.get("refresh_cookie_time"),
    });

    res.send({
      message: "Tokenlar yangilandi",
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const activateClient = async (req, res) => {
  try {
    const client = await Client.findOne({ activation_link: req.params.link });

    if (!client) {
      return res.status(404).send({ message: "Client topilmadi" });
    }

    client.is_active = true;

    await client.save();

    res.send({
      message: "Client faolashtirildi",
      status: client.is_active,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewClient,
  getAllClients,
  getClientById,
  updateClientById,
  deleteClientById,
  loginClient,
  logOutClient,
  refreshTokenClient,
  activateClient,
};
