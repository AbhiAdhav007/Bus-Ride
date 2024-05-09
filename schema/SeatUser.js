const mongoose = require('mongoose');

const SeatUser = mongoose.Schema({
    user_id : {
        type : String,
        require : true,
    },
    name: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    boarding_point : {
        type : String,
        required : true,
    },
    dropping_point : {
        type : String,
    }
    
});

module.exports = SeatUser;