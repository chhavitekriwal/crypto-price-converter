const axios = require('axios');
const Coin = require('../models/coin.model');
const ApiError = require('../utils/ApiError');

const logger = require('../utils/winston');

const getPrice = async (req, res) => {
  const {fromCurrency, toCurrency, date} = req.query;

  try {
    const [fromCurrencyData, toCurrencyData] = await Promise.all([
      Coin.findOne({id: fromCurrency}),
      Coin.findOne({id: toCurrency}),
    ]);

    if (!fromCurrencyData)
      throw new ApiError(400, 'Invalid currency ID', `There is no currency with an id of ${fromCurrency}.`);
    if (!toCurrencyData)
      throw new ApiError(400, 'Invalid currency ID', `There is no currency with an id of ${toCurrency}.`);

    const fromData = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${fromCurrency}/history?date=${date}&localization=false`
    );
    if (!fromData.data.market_data) {
      throw new ApiError(404, 'Price not found', `No price data is available for ${fromCurrency} on ${date}.`);
    }
    const fromPrices = fromData.data.market_data.current_price;
    const toCurrencySymbol = toCurrencyData.symbol;
    let toCurrencyPrice;
    if (fromPrices[toCurrencySymbol]) {
      toCurrencyPrice = fromPrices[toCurrencySymbol];
    } else {
      fromToBtc = fromPrices.btc;
      const toData = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${toCurrency}/history?date=${date}&localization=false`
      );
      if (!toData.data.market_data) {
        throw new ApiError(
          422,
          'Cannot be processed',
          `Direct conversion from ${fromCurrency} to ${toCurrency} is not possible. Indirect conversion is also not possible due to absence of price data for ${toCurrency} on ${date}.`
        );
      }
      toToBtc = await toData.data.market_data.current_price.btc;
      toCurrencyPrice = fromToBtc / toToBtc;
    }

    res.status(200).json({
      date,
      fromCurrency,
      toCurrency,
      price: toCurrencyPrice,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.code).json({error: error.message, reason: error.reason});
    } else {
      logger.error(error);
      res.status(500).json({error: 'Internal server error'});
    }
  }
};

module.exports = getPrice;
