const mongoose = require('mongoose');

const Users = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique : true,
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    password:{
        type : String,
        required : true
    }
});

module.exports = mongoose.model('Users' , Users);