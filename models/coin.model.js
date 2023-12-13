const mongoose = require("mongoose");

const coinSchema = mongoose.Schema(
    {
        id: String,
        symbol: String,
        name: String
    }
)

const Coin = mongoose.model('Coin',coinSchema)

module.exports = Coin;