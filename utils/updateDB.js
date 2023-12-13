const axios = require("axios");
const {Coin} = require("../models/coin.model")

const updateDB = async () => {
    try {
        const coins = (await axios.get("https://api.coingecko.com/api/v3/coins/list")).data;
        for (const coin of coins){
            await Coin.updateOne({id:coin.id},coin,{upsert: true});
        }
        console.log("Database Updated");
    } catch (error) {
        console.error("Error updating database.");
    }
}
module.exports = updateDB