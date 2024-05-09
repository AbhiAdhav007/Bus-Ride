const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const router = require('./routes');
const db = require('./db')
const app = express();
app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 8080;
app.listen(PORT , ()=>{
    console.log(`server running on port ${PORT}`)
})

