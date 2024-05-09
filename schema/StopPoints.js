const mongoose = require('mongoose');

const StopPoints = mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    stop_number: {
        type: Number,
        required: true
    },
    arrival_time: {
        type: Number,
        required: true
    }
});

module.exports = StopPoints;