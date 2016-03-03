'use strict';

// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var playerSchema = new Schema({
    name: { type: String, required: true, unique: true },
    image_url: { type: String },

    games: { type: Number },
    wins: { type: Number },
    losses: { type: Number },
    at_bats: { type: Number },
    hits: { type: Number },
    homeruns: { type: Number },
    walks: { type: Number },
    throws: { type: Number },
    strikes: { type: Number },
    balls: { type: Number },

    strike_perc: { type: Number },
    win_perc: { type: Number },
    base_perc: { type: Number },
    hit_perc: { type: Number },
    
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
        // winning percentage
        player.win_perc = (player.wins / player.games * 100) / 100;
        
        // games played
        player.games = player.wins + player.losses;
        
        // throws made
        player.throws = player.strikes + player.balls;

        // strike percentage
        player.strike_perc = (player.strikes / player.throws * 100) / 100;

        // hit + homerun percentage
        player.hit_perc = ((player.hits + player.homeruns) / player.at_bats * 100) / 100;

        // hit + homerun + walks percentage
        player.base_perc = ((player.hits + player.homeruns + player.walks) / player.at_bats * 100) / 100;

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
        wins: player.wins,
        losses: player.losses,
        strikes: player.strikes,
        balls: player.balls,
        hits: player.hits,
        homeruns: player.homeruns,
        walks: player.walks,
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
