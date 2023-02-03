const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const propertySchema = new Schema({
    property_name : {type: String, required: true, trim: true},
    property_city: {type: String, required: true},
    property_image: {type:String, required: true},
    property_description: {type:String, required: true},
    property_rating_average: {type: Number, required:false},
    property_nightly_fare : {type:Number, required:true},
    property_owner:{type:String, required:true},
    is_available : {type: Boolean, required:true},
    is_deleted: {type:Boolean, required:true}
},{
timestamps: true,
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;


