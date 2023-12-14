const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = require("./app");
const logger = require("./utils/winston");

let server;
mongoose.connect(process.env.MONGO_URI).then(() => {
  logger.info("Connected to database");
  server = app.listen(process.env.PORT, () => {
    logger.info(`Listening to port ${process.env.PORT}`);
  });
});
