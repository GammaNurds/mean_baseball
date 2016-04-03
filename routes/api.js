'use strict';

var express = require('express');
var router = express.Router();

// mongoose models
var Player = require('../models/player');
var Game = require('../models/game');

/**
 * GET /tickets - Retrieves a list of tickets
 * GET /tickets/12 - Retrieves a specific ticket
 * POST /tickets - Creates a new ticket
 * PUT /tickets/12 - Updates ticket #12
 * DELETE /tickets/12 - Deletes ticket #12
 */

// players API
router.get('/players', function (req, res) {
    Player.getPlayers(function(err, players) {
        if (err) {
            //throw err;
            return res.status(500).json({message: err.message});
        }
        //Player.calcPlayerFields();
        res.json(players);
    });
});

router.get('/players/:id', function (req, res) {
    var id = req.params.id;
    Player.getPlayerById(id, function(err, player) {
        if (err) {
            return res.status(500).json({message: err.message});
        }
        res.json(player);
    });
});

router.post('/players', function (req, res) {
    var player = req.body;  // get player object using body-parser
    Player.addPlayer(player, function(err, player) {
        if (err) {
            return res.status(500).json({message: err.message});
        }
        Player.calcFieldsForPlayer(player._id);  // calc stats when created and updated
        res.json(player);
    });
});

router.put('/players/:id', function (req, res) {
    var id = req.params.id;
    var player = req.body;  // get player object using body-parser
    Player.updatePlayer(id, player, function(err, player) {
        if (err) {
            return res.status(500).json({message: err.message});
        }
        Player.calcFieldsForPlayer(player._id);  // calc stats when created and updated
        res.json(player);
    });
});

router.delete('/players/:id', function (req, res) {
    var id = req.params.id;
    Player.deletePlayer(id, function(err, player) {
        if (err) {
            return res.status(500).json({message: err.message});
        }
        res.json(player);
    });
});

// games API
router.get('/games', function (req, res) {
    Game.getGames(function(err, games) {
        if (err) {
            return res.status(500).json({message: err.message});
        }
        res.json(games);
    });
});

router.get('/games/:id', function (req, res) {
    var id = req.params.id;
    Game.getGameById(id, function(err, game) {
        if (err) {
            return res.status(500).json({message: err.message});
        }
        res.json(game);
    });
});

router.post('/games', function (req, res) {
    var game = req.body;  // get player object using body-parser
    Game.addGame(game, function(err, game) {
        if (err) {
            return res.status(500).json({message: err.message});
        }
        res.json(game);
    });
});

router.put('/games/:id', function (req, res) {
    var id = req.params.id;
    var game = req.body;  // get player object using body-parser
    Game.updateGame(id, game, function(err, game) {
        if (err) {
            return res.status(500).json({message: err.message});
        }
        res.json(game);
    });
});

router.delete('/games/:id', function (req, res) {
    var id = req.params.id;
    Game.deleteGame(id, function(err, game) {
        if (err) {
            return res.status(500).json({message: err.message});
        }
        res.json(game);
    });
});

module.exports = router;