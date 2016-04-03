"use strict";

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var apiRouter = require('./routes/api');

// middleware
app.use(express.static(__dirname + '/app'));
app.use(express.static(__dirname));  // include bower_components
app.use(bodyParser.json());

// mongoose + mongoose schemas
var mongoose = require('mongoose');
//export MONGOLAB_URI="mongodb://admin:root@ds019678.mlab.com:19678/heroku_5d24197s"
var db = "mongodb://admin:root@ds019678.mlab.com:19678/heroku_5d24197s";
//var db = 'mongodb://localhost/baseballdb';

mongoose.connect(db, function(err) {
    if (err) {
        console.log("couldn't connect to mongodb!");
        console.log(err);
    } else {
        console.log("connected to mongodb successfull!");
    }
});

app.disable('x-powered-by');  // security

app.use('/api', apiRouter);

app.listen(port, function () {
    console.log('Server listening on port ' + port + "!");
});