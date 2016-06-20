var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
var Parking     =   require("./models/parking");
var router      =   express.Router();
var mongoose    =   require("mongoose");
mongoose.connect('mongodb://localhost:27017/parking');
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:3000)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.route("/parkings")
    // GET Parkings
    .get(function(req, res) {
        Parking.find(function(err, parkings) {
            if (err) {
                res.send(err);
            }

            res.json(parkings);
        });
    });

router.route('/parkings/:parking_id')

    // Get Parking by id
    .get(function(req, res) {
        Parking.findById(req.params.parking_id, function(err, parking) {
            if (err){
                res.send(err);
            }

            res.json(parking);
        });
    })

    // Update Parking
    .put(function(req, res) {
        // use our Parking model to find the Parking we want
        Parking.findById(req.params.parking_id, function(err, parking) {
            if (err) {
                res.send(err);
            }

            parking.name = req.body.name;
            parking.occupancy = 2;

            // save the Parking
            parking.save(function(err) {
                if (err) {
                    res.send(err);
                }

                res.json({ message: 'Parking updated!' });
            });

        });
    })

    .delete(function(req, res) {
        Parking.remove({
            _id: req.params.parking_id
        }, function(err, parking) {
            if (err) {
                res.send(err);
            }

            res.json({ message: 'Parking successfully deleted' });
        });
    });

router.route('/book/:parking_id')
    .post(function(req, res) {
        Parking.findById(req.params.parking_id, function(err, parking) {
            if (err) {
                res.send(err);
            }
            if (parking.occupancy == 0) {
                return res.json({ message: 'This parking is full :('});
            }
            parking.occupancy = parking.occupancy - 1;

            // save the Parking
            parking.save(function(err) {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'Parking Booked!' });
            });

        });
    })

app.use('/',router);

app.listen(port);
console.log("Listening to PORT " + port);
