const express = require('express');
const router = express.Router();
// const cities = require('../cityList');
const UserController = require('../Controllers/UserController')
const TourController = require('../Controllers/TourController');
const TicketController = require('../Controllers/TicketController');
const { authenticate } = require("../Middleware/auth");
const BusTypeModel = require('../schema/BusType');


router.post("/cities/add", TourController.add_cities);
router.get("/cities", TourController.get_cities);
router.get("/city", TourController.get_city);

router.get("/tour/find", TourController.find_tour);
router.post("/tour/add", TourController.add_tour);
router.get("/tour/find/:id", TourController.get_tour_details);

router.put('/ticket/book' ,authenticate, TicketController.book_ticket);
router.delete("/tour/cancel/", authenticate, TicketController.cancel_trip);

router.post('/user/login' , UserController.login);
router.post('/user/sign_up' , UserController.sign_up);

router.post("/bus/create_type", async (req, resp) => {
    const busType = req.body;
    try {
        const response = await BusTypeModel.create(busType);
        resp.status(201).json({message: 'Created successfully', result: response})
    }
    catch(error){
        resp.status(500).json({message: 'Failed to create bus type', error})
    }
})

router.get("/bus/types", async (req, resp) => {
    try{
        const response = await BusTypeModel.find({});
        resp.status(200).json({message: "Loaded successfully", result: response})
    }   
    catch(error){
        resp.status(500).json({message: "Failed to load", error})
    }
}),

module.exports = router;