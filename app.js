const express = require('express');
const cron = require('node-cron');
const routes = require('./routes/price.route');
const updateDB = require('./utils/updateDB');
const app = express();
const morgan = require('./utils/morgan');
const cors = require('cors');
const { errorConverter,errorHandler } = require('./middleware/error');

app.use(cors());
app.options('*', cors());

app.use(morgan.successHandler);
app.use(morgan.errorHandler);

app.use('/api/crypto', routes);

app.use(errorConverter);
app.use(errorHandler);

cron.schedule('0 * * * *', updateDB);

module.exports = app;
