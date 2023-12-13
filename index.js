const mongoose = require("mongoose");
const app = require("express");

let server;
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to database");
  server = app.listen(config.port, () => {
    console.log(`Listening to port ${config.port}`);
  });
});
