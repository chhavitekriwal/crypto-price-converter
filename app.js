const express = require("express");
const cron = require('node-cron');
const routes = require("./routes");
const updateDB = require("./utils/updateDB");
const app = express();

app.use("/",routes);

cron.schedule("0 * * * *", updateDB);

module.exports = app;