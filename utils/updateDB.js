const axios = require('axios');
const Coin = require('../models/coin.model');
const logger = require('../utils/winston');

const updateDB = async () => {
  try {
    logger.info('Starting database update');
    const fetchedCoins = (await axios.get('https://api.coingecko.com/api/v3/coins/list')).data;
    const existingCoins = await Coin.find({}, {id: 1, _id: 0});
    
    const fetchedCoinIds = new Set(fetchedCoins.map(coin => coin.id));
    const existingCoinIds = new Set(existingCoins.map(coin => coin.id));

    const coinsToAdd = fetchedCoins.filter(coin => !(existingCoinIds.has(coin.id)));
    const coinsToDelete = existingCoins.filter(coin => !(fetchedCoinIds.has(coin.id))).map(coin => coin.id);

    if (coinsToAdd.length > 0) {
      await Coin.insertMany(coinsToAdd);
    }
    if (coinsToDelete.length > 0) {
      const result = await Coin.deleteMany({id : {$in: coinsToDelete}});
    }
    const coins = await Coin.countDocuments();
    logger.info(`Database Updated. ${coins} records.`);
  } catch (error) {
    logger.error('Error updating database');
    logger.error(error);
  }
};
module.exports = updateDB;
