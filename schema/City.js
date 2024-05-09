const mongoose = require('mongoose');

const City = mongoose.Schema({
    city_name: {
        required: true,
        type: String,
    },
    state: {
        required: true,
        type: String,
    },
    pincode: {
        required: true,
        type: String,
    },
    country: {
        required: true,
        type: String
    }
});

module.exports =  mongoose.model("Cities", City);