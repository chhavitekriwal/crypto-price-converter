const axios = require("axios");
const {Coin} = require("../models")

const updateDB = async () => {
    try {
        const coins = await axios.get("https://api.coingecko.com/api/v3/coins/list");
        for (const coin of coins){
            await Coin.updateOne({id:coin.id},coin,{upsert: true});
        }
        console.log("Database Updated");
    } catch (error) {
        console.error("Error updating database:");
        console.error("Error Name:", error.name);
        console.error("Error Message:", error.message);
    }
}
module.exports = updateDB