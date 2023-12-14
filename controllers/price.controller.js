const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const priceService = require('../services/price.service');

const getPrice = catchAsync(async (req, res) => {
  const {fromCurrency, toCurrency, date} = req.query;
  const response = await priceService(fromCurrency,toCurrency,date);
  res.status(httpStatus.OK).json(response);
});

module.exports = getPrice;
