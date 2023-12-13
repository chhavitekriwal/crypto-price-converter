const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = require("./app");

let server;
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to database");
  server = app.listen(process.env.PORT, () => {
    console.log(`Listening to port ${process.env.PORT}`);
  });
});
