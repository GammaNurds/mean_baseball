'use strict';

// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var playerSchema = new Schema({
    name: { type: String, required: true, unique: true },
    games: Number,
    wins: Number,
    losses: Number,
    image_url: String,
    win_perc: Number,
    strikes: Number,
    balls: Number,
    //created_at: Date,
    updated_at: { type: Date, default: Date.now }
});

// the schema is useless so far
// we need to create a model using it and
// make this available to our users in our Node applications
var Player = module.exports = mongoose.model('Player', playerSchema);

// instance functions (e.g. var player = new Player(); player.findSimilar())
/*playerSchema.methods.findSimilar = function(callback, limit) {
    //this.find(callback).limit(limit);
    //return this.model('Animal').find({ type: this.type }, cb);
};*/

// global functions (e.g. Player.getAll()) ->  actually works on all schemas etc.
// names have to be getPlayers() instead of getAll() because these are global functions
// and are available everywhere. getAll() would already be defined when trying to implement
// it for the next Schema
module.exports.getPlayers = function(callback, limit) {
    Player.find(callback).limit(limit);
};

module.exports.getPlayerById = function(id, callback) {
    Player.findById(id, callback);
};

module.exports.addPlayer = function(player, callback) {
    Player.create(player, callback);
};

module.exports.calcPlayerFields = function(id) {
    Player.findById(id, function(err, player) {
        player.win_perc = Math.round(player.wins / player.games * 100) / 100;
        player.save();
    });
};

module.exports.updatePlayer = function(id, player, callback) {
    // builds a query object with id=providedID, could also be name=specificname
    var query = {
        _id: id
        //name: "specificName"
    };
    // build an updated player object out of the provided object in parameters
    // could also just use the parameter object directly (var update = player;)
    // but this way I can only apply selected attributes and ignore others
    var update = {
        name: player.name,
        games: player.games,
        wins: player.wins,
        losses: player.losses,
        strikes: player.strikes,
        balls: player.balls,
        at_bats: player.at_bats
    };
    Player.findOneAndUpdate(query, update, callback);
};

module.exports.deletePlayer = function(id, callback) {
    var query = {
        _id: id
    };
    Player.remove(query, callback);
};
