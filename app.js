const express = require("express");
const cron = require('node-cron');
const routes = require("./routes/price.route");
const updateDB = require("./utils/updateDB");
const app = express();

app.use("/api/crypto",routes);

cron.schedule("0 * * * *", updateDB);

module.exports = app;