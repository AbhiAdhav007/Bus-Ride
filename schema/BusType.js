const mongoose = require('mongoose');

const BusType = mongoose.Schema({
    identifier: {
        unique: true,
        type: String,
        required: true
    },
    display_text: {
        unique: String,
        type: String,
        required: true
    }
});

module.exports = mongoose.model("BusType", BusType);