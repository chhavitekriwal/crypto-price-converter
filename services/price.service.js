const Coin = require('../models/coin.model');
const axios = require('axios');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

const convert = async (ACurrency, BCurrency, date) => {
    const [A, B] = await Promise.all([Coin.findOne({id: ACurrency}),Coin.findOne({id: BCurrency}),]);

    if(!A) throw new ApiError(httpStatus.BAD_REQUEST, `Invalid currency ID. There is no currency with an id of ${ACurrency}.`);
    if(!B) throw new ApiError(httpStatus.BAD_REQUEST, `Invalid currency ID. There is no currency with an id of ${BCurrency}.`);
    
    const A_URL = `https://api.coingecko.com/api/v3/coins/${ACurrency}/history?date=${date}&localization=false`
    const AData = (await axios.get(A_URL)).data;
  
    if(!AData.market_data) throw new ApiError(httpStatus.NOT_FOUND,`No price data is available for ${A.name} on ${date}.`);

    const APrices = AData.market_data.current_price;
    const BSymbol = B.symbol;

    let APriceInB;
    if(APrices[BSymbol]) APriceInB = APrices[BSymbol];
    else {
        AToBTC = APrices.btc;

        const B_URL = `https://api.coingecko.com/api/v3/coins/${BCurrency}/history?date=${date}&localization=false`
        const BData = (await axios.get(B_URL)).data;
        if (!BData.market_data) {
            throw new ApiError(
                httpStatus.UNPROCESSABLE_ENTITY,
                `Direct conversion from ${A.name} to ${B.name} not possible. Indirect conversion also not possible due to absence of price data for ${B.name} on ${date}.`
            );
        }
        BToBTC = BData.market_data.current_price.btc;
        APriceInB = AToBTC / BToBTC;
    }

    return response = {
        fromCurrency: {
            id: A.id,
            name: A.name
        },
        toCurrency: {
            id: B.id,
            name: B.name
        },
        price: APriceInB,
        date
    };
}

module.exports = convert