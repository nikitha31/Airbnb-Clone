const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ratingSchema = new Schema({
    property_id: {type: String,required:true },
    rating: {type:Number, required:true}
}, 
{
    timestamps : true,
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;



