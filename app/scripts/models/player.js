'use strict';

// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var playerSchema = new Schema({
    name: { type: String, required: true, unique: true },
    image_url: { type: String },
    nickname: String,

    games: { type: Number, default: 0 },
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    at_bats: { type: Number, default: 0 },
    hits: { type: Number, default: 0 },
    homeruns: { type: Number, default: 0 },
    walks: { type: Number, default: 0 },
    throws: { type: Number, default: 0 },
    strikes: { type: Number, default: 0 },
    balls: { type: Number, default: 0 },
    defense_plays: { type: Number, default: 0 },

    strike_perc: { type: Number, default: 0 },
    win_perc: { type: Number, default: 0},
    base_perc: { type: Number, default: 0},
    hit_perc: { type: Number, default: 0 },
    def_per_game: { type: Number, default: 0 },
    pts_per_atbat: { type: Number, default: 0 },
    
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

/*module.exports.calcPlayerFields = function() {
    Player.find(function(err, players) {
        for (var key in players) {
            var player = players[key];

            console.log("calc stats for player: " + player.name);
            
            // games played
            player.games = player.wins + player.losses;  // 0 on first

            // winning percentage
            player.win_perc = Math.round(player.wins / player.games * 100) / 100;
            
            // throws made
            player.throws = player.strikes + player.balls;

            // strike percentage
            player.strike_perc = Math.round(player.strikes / player.throws * 100) / 100;

            // hit + homerun percentage
            player.hit_perc = Math.round((player.hits + player.homeruns) / player.at_bats * 100) / 100;

            // hit + homerun + walks percentage
            player.base_perc = Math.round((player.hits + player.homeruns + player.walks) / player.at_bats * 100) / 100;

            // defensive plays per game
            player.def_per_game = Math.round((player.defense_plays / player.games * 100) / 100;

            player.save();
        }
    });
    
};*/

module.exports.calcFieldsForPlayer = function(id) {
    console.log("looking for player with id: " + id);
    Player.findById(id, function(err, player) {
        
        console.log("calc stats for player: " + player.name);
    
        // games played
        player.games = player.wins + player.losses;  // 0 on first

        // winning percentage
        player.win_perc = Math.round(player.wins / player.games * 100) / 100;
        
        // throws made
        player.throws = player.strikes + player.balls;

        // strike percentage
        player.strike_perc = Math.round(player.strikes / player.throws * 100) / 100;

        // hit + homerun percentage
        player.hit_perc = Math.round((player.hits + player.homeruns) / player.at_bats * 100) / 100;

        // hit + homerun + walks percentage
        player.base_perc = Math.round((player.hits + player.homeruns + player.walks) / player.at_bats * 100) / 100;

        // defensive plays per game
        player.def_per_game = Math.round(player.defense_plays / player.games * 100) / 100;

        // points per at-bat
        player.pts_per_atbat = Math.round((player.hits + (player.homeruns * 2) + player.walks) / player.at_bats * 100) / 100;

        player.save();

    });
    
};

module.exports.updatePlayer = function(id, player, callback) {
    //console.log("updating player " + player.name + " at ID: " + id);
    // builds a query object with id=providedID, could also be name=specificname
    var query = {
        _id: id
        //name: "specificName"
    };

    // build an updated player object out of the provided object in parameters
    // could also just use the parameter object directly (var update = player;)
    // but this way I can only apply selected attributes and ignore others
    // but: "ALL ATTRIBUTES IN UPDATE HAVE TO BE ASSIGNED IN THE JSON, IT CANNOT BE UNDEFINED"
    var update = {
        name: player.name,
        nickname: player.nickname,
        image_url: player.image_url,
        wins: player.wins,
        losses: player.losses,
        strikes: player.strikes,
        balls: player.balls,
        hits: player.hits,
        homeruns: player.homeruns,
        walks: player.walks,
        at_bats: player.at_bats,
        defense_plays: player.defense_plays
    };

    Player.findOneAndUpdate(query, update, callback);
};

module.exports.deletePlayer = function(id, callback) {
    var query = {
        _id: id
    };
    Player.remove(query, callback);
};
