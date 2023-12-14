const express = require('express');
const cron = require('node-cron');
const routes = require('./routes/price.route');
const updateDB = require('./utils/updateDB');
const app = express();
const morgan = require('./utils/morgan');
const cors = require('cors');

app.use(cors());
app.options('*', cors());
if (process.env.MODE !== 'production') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}
app.use('/api/crypto', routes);

cron.schedule('0 * * * *', updateDB);

module.exports = app;
