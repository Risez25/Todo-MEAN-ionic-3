// Set up
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');
 
// Configuration
mongoose.connect('mongodb://localhost/POS');
 
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());
 
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', '*');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});
 
// Models
var List = mongoose.model('list', {
    name: String
});
 
// Routes
 
    // Get reviews
    app.get('/api/list', function(req, res) {
 
        console.log("fetching reviews");
 
        // use mongoose to get all reviews in the database
        List.find(function(err, reviews) {
 
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)
 
            res.json(reviews); // return all reviews in JSON format
        });
    });
    // app.put('/cat/:id', function(req, res) {
    //     Cat.findOneAndUpdate({ _id: req.params.id }, req.body, function(err) {
    //         if (err) return console.error(err);
    //         res.sendStatus(200);
    //     })
    // });
    app.put('/list/:id', function(req, res) {
        List.findOneAndUpdate({_id:req.params.id},req.body,function(err){
            if (err) return console.error(err);
            List.find(function(error, list) {
                if (error)
                    res.send(error)
                res.json(list);
            });
        })
    });

    // create review and send back all reviews after creation
    app.post('/api/list', function(req, res) {
 
        console.log(req.body);
 
        // create a review, information comes from request from Ionic
        List.create({
            name : req.body.name,
        }, function(err, list) {
            if (err)
                res.send(err);
 
            // get and return all the list after you create another
            List.find(function(err, list) {
                if (err)
                    res.send(err)
                res.json(list);
            });
        });
 
    });
 
    // delete a review
    app.delete('/api/list/:review_id', function(req, res) {
        List.remove({
            _id : req.params.review_id
        }, function(err) {
            if(err){
                res.json(err);
            }
            List.find(function(error, list) {
                if (error)
                    res.send(error)
                res.json(list);
            });
        });
    });
 
 
// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");