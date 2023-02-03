const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const favouriteSchema = new Schema({
    property_id: {type: String,required:true },
    user_email: {type:String, required:true}
}, 
{
    timestamps : true,
});

const Favourite = mongoose.model('Favourite', favouriteSchema);

module.exports = Favourite;



