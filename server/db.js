const mongoose = require('mongoose');

const URL = 'mongodb://127.0.0.1:27017/bus_ride';
mongoose.connect(URL);
const db = mongoose.connection;
db.on('connected', ()=>{
    console.log('mongoDB connected');
})

module.exports = db;