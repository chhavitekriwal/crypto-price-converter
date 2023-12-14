const axios = require('axios');
const Coin = require('../models/coin.model');
const logger = require('../utils/winston');

const updateDB = async () => {
  try {
    logger.info('Starting database update');
    const fetchedCoins = (await axios.get('https://api.coingecko.com/api/v3/coins/list')).data;

    const existingCoins = await Coin.find({}, {id: 1, _id: 0});
    const existingCoinIds = new Set(existingCoins.map(coin => coin.id));

    const newCoins = fetchedCoins.filter(coin => !(existingCoinIds.has(coin.id)));

    if (newCoins.length > 0) {
      await Coin.insertMany(newCoins);
    }
    logger.info('Database Updated');
  } catch (error) {
    logger.error('Error updating database');
    logger.error(error);
  }
};
module.exports = updateDB;
