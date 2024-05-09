const mongoose = require('mongoose');
const Location = require('./Location');
const Seats = require('./Seats');
const StopPoints = require('./StopPoints');
const moment = require('moment');
const Tour = mongoose.Schema({

    source: {
        type: Location,
        required: true,
    },
    destination: {
        type: Location,
        required: true
    },
    tour_date: {
        type: String,
        required: true,
    },
    bus_partner: {
        type: String,
        required: true
    },
    seat_layout: {
        type: [Seats],
        required: true
    },
    dropping_points: [StopPoints],
    boarding_points: [StopPoints],
    created:{
        type : Number,
    },
    updated:{
        type : Number,
    }
});

module.exports = mongoose.model("Tour", Tour);