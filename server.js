"use strict";

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

// middleware
app.use(express.static(__dirname + '/app'));
app.use(express.static(__dirname));  // include bower_components
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// mongoose + mongoose schemas
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/baseballdb');
mongoose.connect(process.env.MONGOLAB_URI, function(err) {
    if (err) {
        console.log("couldn't connect to mongodb!");
        console.log(err);
    } else {
        console.log("connected to mongodb successfull!");
    }
});

var Player = require('./app/scripts/models/player');
var Game = require('./app/scripts/models/game');

// security
app.disable('x-powered-by');

/**
 * GET /tickets - Retrieves a list of tickets
 * GET /tickets/12 - Retrieves a specific ticket
 * POST /tickets - Creates a new ticket
 * PUT /tickets/12 - Updates ticket #12
 * DELETE /tickets/12 - Deletes ticket #12
 */

/*app.get('/', function (req, res) {
    res.send('use /api/players');
});*/

// players API
app.get('/api/players', function (req, res) {
    Player.getPlayers(function(err, players) {
        if (err) {
            throw err;
        }
        //Player.calcPlayerFields();
        res.json(players);
    });
});

app.get('/api/players/:id', function (req, res) {
    var id = req.params.id;
    Player.getPlayerById(id, function(err, player) {
        if (err) {
            throw err;
        }
        res.json(player);
    });
});

app.post('/api/players', function (req, res) {
    var player = req.body;  // get player object using body-parser
    Player.addPlayer(player, function(err, player) {
        if (err) {
            throw err;
        }
        Player.calcFieldsForPlayer(player._id);  // calc stats when created and updated
        res.json(player);
    });
});

app.put('/api/players/:id', function (req, res) {
    var id = req.params.id;
    var player = req.body;  // get player object using body-parser
    Player.updatePlayer(id, player, function(err, player) {
        if (err) {
            throw err;
        }
        Player.calcFieldsForPlayer(player._id);  // calc stats when created and updated
        res.json(player);
    });
});

app.delete('/api/players/:id', function (req, res) {
    var id = req.params.id;
    Player.deletePlayer(id, function(err, player) {
        if (err) {
            throw err;
        }
        res.json(player);
    });
});

// games API
app.get('/api/games', function (req, res) {
    Game.getGames(function(err, games) {
        if (err) {
            throw err;
        }
        res.json(games);
    });
});

app.get('/api/games/:id', function (req, res) {
    var id = req.params.id;
    Game.getGameById(id, function(err, game) {
        if (err) {
            throw err;
        }
        res.json(game);
    });
});

app.post('/api/games', function (req, res) {
    var game = req.body;  // get player object using body-parser
    Game.addGame(game, function(err, game) {
        if (err) {
            throw err;
        }
        res.json(game);
    });
});

app.put('/api/games/:id', function (req, res) {
    var id = req.params.id;
    var game = req.body;  // get player object using body-parser
    Game.updateGame(id, game, function(err, game) {
        if (err) {
            throw err;
        }
        res.json(game);
    });
});

app.delete('/api/games/:id', function (req, res) {
    var id = req.params.id;
    Game.deleteGame(id, function(err, game) {
        if (err) {
            throw err;
        }
        res.json(game);
    });
});

app.listen(port, function () {
    console.log('Server listening on port ' + port + "!");
});