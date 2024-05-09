const jwt = require('jsonwebtoken');
const Tours = require('../schema/Tour');
const Users = require('../schema/UserDetails');
const mongoose = require('mongoose');
const moment = require('moment');
const secretToken = process.env.JWT_SECRET;
async function book_ticket(req , res){

    const _ = require('loadsh');

    let options = req.body;
    const token = req.headers.authorization;
    const tour_id = await create_objectId(options.tour_id);

    let tour = await Tours.findOne({'_id' : tour_id});

    if(!tour){
        return res.status(404).json({message : 'Tour not found'});
    }

    const user = await get_user_by_token(token);

    const is_booked = tour.seat_layout.find(seat => (seat.seat_number == options.seat_number) && seat.is_booked);
    
    if(is_booked){
        return res.status(400).json({'message' : 'Seat already booked'});
    }

    const boarding_point = tour.boarding_points.find((point)=> point.stop_number == options.boarding_stop_num);
    const dropping_points = _.keyBy(tour.dropping_points , 'stop_number');
    const dropping_point = dropping_points[options.dropping_stop_num];
    
    let seat_user = {};
    seat_user.user_id = user._id.toString();
    seat_user.name = user.name;
    seat_user.phone_number = user.phone_number;
    seat_user.boarding_point = boarding_point.address;
    seat_user.dropping_point = dropping_point.address;

    const booking_number = generateBookingNumber('#TXNUM');

    let update_flag = false;   
    tour.seat_layout.map((seat)=>{
        if((seat.seat_number == options.seat_number) && seat.is_seat){
            update_flag = true;
            seat.user_details = seat_user;
            seat.is_booked = true;
            seat.booking_number  = booking_number;
        }
        return seat;
    });
    
    if(!update_flag){
        return res.status(500).json({'message' : 'Invalid seat...!'})
    }
    tour.updated = moment().unix();
    await Tours.updateOne({_id : tour._id} ,{$set : tour} );
    return res.status(200).json({'message' : 'Your booking is confirm' , booking_number})
};
async function get_user_by_token(token){

    let user_id = jwt.verify(token,secretToken);
    user_id = await create_objectId(user_id);
    
    return await Users.findOne({'_id' : user_id});
}
async function create_objectId(id){

    return new mongoose.Types.ObjectId(id);
};

function generateBookingNumber(prefix) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let bookingNumber = prefix.toUpperCase();
  const charactersLength = characters.length;
  for (let i = 0; i < 10 - prefix.length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    bookingNumber += characters.charAt(randomIndex);
  }
  return bookingNumber;
};

async function cancel_trip(req , res){

    try{
        const tourId = req.query.tourId;
        const tour_id = await create_objectId(tourId);

        if(!tour_id){
            return res.status(400).json({message : 'Please provide valid trip id'})
        }

        const response = await Tours.updateOne( { '_id': tour_id, 'seat_layout.booking_number': `#${req.query.bookingId}` },
        { $set: { 'seat_layout.$.is_booked': false, 'seat_layout.$.user_details': null } });

        if(response.matchedCount == 0){
            return res.status(403).json({message : 'Invalid Credentials'})
        }
        return res.status(200).json({message : 'Trip Cancelled...!'})
    }catch(error){
        res.status(500).json({message: 'Failed to cancel ticket', error})
    }
}

module.exports = {book_ticket , cancel_trip}