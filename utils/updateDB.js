const {Coin} = require("../models")

const updateDB = async () => {
    const url = "https://api.coingecko.com/api/v3/coins/list"
    try {
        let coins = await fetch(url, {method: "GET"});
        coins = await response.json();
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