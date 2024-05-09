const mongoose = require('mongoose');
const Location = mongoose.Schema({

    city_id: {
        type: String,
        required: true
    },
    city_name: {
        type: String,
        required: true,
    },
    arrival_time: {
        type: String,
        required: true,
    }
});

module.exports = Location;