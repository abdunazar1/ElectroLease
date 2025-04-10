const express = require("express");
const config = require("config");
const Sequelize = require("./config/db");
const indexRouter = require("./routes/index.routes");
const cookieParser = require("cookie-parser");
const logger = require("./services/logger.service");
const errorHandling = require("./middleware/error/error.handling");

const PORT = config.get("port") || 3030;

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api", indexRouter);

app.use(errorHandling);

async function start() {
  try {
    await Sequelize.authenticate();
    await Sequelize.sync({ alter: true });

    app.listen(PORT, () => {
      console.log(`Server started at: http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error(error);
  }
}

start();
