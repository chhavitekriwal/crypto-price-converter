const axios = require("axios");
const Coin = require("../models/coin.model");

const getPrice = async (req,res) => {
    const {fromCurrency,toCurrency,date} = req.query;

    try {
        const [fromCurrencyData,toCurrencyData] = await Promise.all([
            Coin.findOne({id:fromCurrency}),
            Coin.findOne({id:toCurrency})
        ])

        if(!fromCurrencyData || !toCurrencyData) {
            return res.status(400).json({error: "One or more currencies missing"});
        }

        const fromData = await axios.get(`https://api.coingecko.com/api/v3/coins/${fromCurrency}/history?date=${date}&localization=false`); 
        if(!fromData.data.market_data) {
            return res.status(404).json({error: `Price not found for ${fromCurrency} on ${date}`});
        }
        const fromPrices = fromData.data.market_data.current_price;
        const toCurrencySymbol = toCurrencyData.symbol;
        let toCurrencyPrice;
        if(fromPrices[toCurrencySymbol]) {
            toCurrencyPrice = fromPrices[toCurrencySymbol];
        } else {
            fromToBtc = fromPrices.btc;
            const toData = await axios.get(`https://api.coingecko.com/api/v3/coins/${toCurrency}/history?date=${date}&localization=false`);
            if (!toData.data.market_data) {
                return res.status(422).json({ error: `Cannot determine the price of ${fromCurrency} in terms of ${toCurrency} on ${date}`});
            }            
            toToBtc = await toData.data.market_data.current_price.btc;
            toCurrencyPrice = fromToBtc/toToBtc;
        }

        res.status(200).json({
            date,
            fromCurrency,
            toCurrency,
            price: toCurrencyPrice
        });
    } catch (err) {
        res.status(500).json({error: 'Internal server error'});
    }
}

module.exports = getPrice;