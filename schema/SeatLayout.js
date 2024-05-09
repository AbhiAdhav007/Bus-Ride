const mongoose = require('mongoose');
const Seats = require('./Seats');

const SeatLayout = mongoose.Schema({
    tour_id: {
        type: String,
        required: true
    },
    structure: {
        type: [[Seats]],
        required: true
    }
});

module.exports = mongoose.model("SeatLayout", SeatLayout);