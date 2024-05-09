const Tours = require('../schema/Tour');
const CityModel = require('../schema/City');
const BusTypeModel = require('../schema/BusType');
const moment = require('moment');

async function find_tour(req, resp){
    const src = req.query.src;
    const dest = req.query.dest;

    try {
        const from_city = await CityModel.findOne({city_name : src});
        const to_city = await CityModel.findOne({city_name : dest});

        if(!from_city){
            return resp.status(200).json({message : `Tour is not available from ${src}`});
        }else if(!to_city){
            return resp.status(200).json({message : `Tour is not available to ${dest}`});
        }
        const response = await Tours.findOne({"source.city_id": from_city._id.toString(), "destination.city_id" : to_city._id.toString()});
        if(!response){
            return resp.status(200).json({message : "Tour Not Found ...!"})
        }
        resp.status(200).json({message: "Loaded available tours successfully", result: response})
    }
    catch(error){
        console.log(error)
        resp.status(500).json({message: "Something went wrong!", error})
    }
};
async function add_tour(req, res) {
    try{
        let allCityIds = await CityModel.find({}, "_id");
        allCityIds = allCityIds.map((item) => item._id.toString());
        let {source, destination , tour_date} = req.body;


        if(!allCityIds.includes(source.city_id) && !allCityIds.includes(destination.city_id)){
            return res.status(400).json({message: "Invalid City Id's"})
        }

        let tour = req.body;
        tour.created = moment().unix();
        tour.updated = moment().unix();
        const response = await Tours.create(tour);
        res.status(201).json({message: "Created tour successfully!", tour_id: response._id})
    }
    catch(error){
        res.status(500).json({message:`SOmething went wrong ${error}`})
    }
};
async function get_tour_details(req, resp){
    // fetch the details of a particular tour_id
    const tourId = req.params.tourId;
    try{
        const response = await Tours.find({_id: tourId});
        resp.status(200).json({message: "Loaded tour details successfully!", result: response})
    }
    catch(error){
        resp.status(500).json({message: "Something went wrong", error})
    }
};

//AdminController
async function add_cities(req, res) {
    const citiesList = req.body;
    try {
        let response ;
        if(Array.isArray(citiesList)){
             response = await CityModel.insertMany(citiesList)
             resp.status(201).json({message: `${response.length} cities saved successfully.`})
        }
        else{
            response = await CityModel.create(citiesList)
            res.status(201).json({message: `1 city saved successfully.`})
        }
    }
    catch(error){
        console.log(`Something went wrong ${error}`)
        res.status(500).json({message: "Something went wrong!"})
    }
};
async function get_cities (req, res) {
    try{
        const citiesList = await CityModel.find({});
        res.status(200).json({message: "Loaded cities successfully", cities_list: citiesList})
    }
    catch(error){
        res.status(500).json({message: `Failed to load cities ${error}`})
    }
};
async function get_city (req, res){
    const searchString = req.query.search;
    try{
        const response = await CityModel.find({city_name: { $regex: new RegExp(searchString, 'i')  }})
        res.status(200).json({results: response})
    }   
    catch(error){
        res.status(500).json({message: "Failed to load", error})
    }
};

module.exports = {find_tour , add_tour , get_tour_details , add_cities , get_cities , get_city};