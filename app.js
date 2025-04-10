const express = require("express");
const config = require("config");
const Sequelize = require("./config/db");
const indexRouter = require("./routes/index.routes");
const cookieParser = require("cookie-parser");
const logger = require("./services/logger.service");
const loggerMiddleware = require("./middleware/error/loggerMiddleware");
const errorHandler = require("./middleware/error/error.middleware"); 

const PORT = config.get("port") || 3030;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(loggerMiddleware); 

app.use("/api", indexRouter);

app.use(errorHandler);

async function start() {
  try {
    await Sequelize.authenticate();
    await Sequelize.sync({ alter: true });

    app.listen(PORT, () => {
      console.log(`Server started at: http://localhost:${PORT}`);
    });
  } catch (error) {
    
    logger.log(error);
  }
}

start();
