var mongoose  =   require('mongoose');
var Schema    =   mongoose.Schema;
require("./parking");
var Parking   =   mongoose.model('parking');

// create schema
var bookingSchema  = new Schema({
    "parking" : {type: mongoose.Schema.Types.ObjectId, ref: 'parking'},
    "user" : String,
    "reservationCode" : String
});
// create model if not exists.
module.exports = mongoose.model('booking', bookingSchema);
