const mongoose = require('mongoose');
const UserDetails = require('./SeatUser');
const Seats = mongoose.Schema({
    is_seat: {
        type: Boolean,
        required: true
    },
    seat_number: {
        type: String,
    },
    seat_type: { // 'SLEEPER' | 'SEMI_SLEEPER'
        type: String,
    },
    seat_price: {
        type: String,
    },
    is_booked: {
        type: Boolean,
    },
    user_details: {
        type: UserDetails,
    },
    booking_number : {
        type : String,
    }
});

module.exports = Seats;