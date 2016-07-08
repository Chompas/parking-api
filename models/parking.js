var mongoose  =   require('mongoose');
var Schema    =   mongoose.Schema;
// create schema
var parkingSchema  = new Schema({
    "name" : String,
    "lat" : String,
    "lon" : String,
    "price" : Number,
    "hours" : String,
    "address" : String,
    "neighborhood" : String,
    "occupancy": Number
});
// create model if not exists.
module.exports = mongoose.model('parking', parkingSchema);
