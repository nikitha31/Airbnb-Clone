const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    user_reserved_id: {type: String,required:true },
    reserved_property_id : {type: String,required:true},
    reservation_start_date: {type:Date, required: true},
    reservation_end_date: {type:Date, required: true},
    is_cancelled: {type:Boolean, requied: true},
}, 
{
    timestamps : true,
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;



