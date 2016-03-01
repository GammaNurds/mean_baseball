'use strict';

// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var gameSchema = new Schema({
    player1: { type: String, required: true },
    player2: { type: String, required: true },
    winner: String,
    plays: Array,
    //loser: String,
    updated_at: { type: Date, default: Date.now }
});

// the schema is useless so far
// we need to create a model using it and
// make this available to our users in our Node applications
var Game = module.exports = mongoose.model('Game', gameSchema);

// instance functions (e.g. var player = new Player(); player.findSimilar())
/*playerSchema.methods.findSimilar = function(callback, limit) {
    //this.find(callback).limit(limit);
    //return this.model('Animal').find({ type: this.type }, cb);
};*/

// global functions (e.g. Player.getAll()) ->  actually works on all schemas etc.
// names have to be getPlayers() instead of getAll() because these are global functions
// and are available everywhere. getAll() would already be defined when trying to implement
// it for the next Schema
module.exports.getGames = function(callback, limit) {
    Game.find(callback).limit(limit);
};

module.exports.getGameById = function(id, callback) {
    Game.findById(id, callback);
};

module.exports.addGame = function(game, callback) {
    Game.create(game, callback);
};

module.exports.updateGame = function(id, game, callback) {
    // builds a query object with id=providedID, could also be name=specificname
    var query = {
        _id: id
        //name: "specificName"
    };
    // build an updated player object out of the provided object in parameters
    // could also just use the parameter object directly (var update = player;)
    // but this way I can only apply selected attributes and ignore others
    var update = {
        player1: game.player1,
        player2: game.player2,
        winner: game.winner
        //loser: game.loser
    };
    Game.findOneAndUpdate(query, update, callback);
};

module.exports.deleteGame = function(id, callback) {
    var query = {
        _id: id
    };
    Game.remove(query, callback);
};
