const mongoose = require("mongoose");
const schema = mongoose.Schema;

//Game Schema
const GameSchema = new schema({
    appid: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

module.exports = Meal = mongoose.model('Game', GameSchema);