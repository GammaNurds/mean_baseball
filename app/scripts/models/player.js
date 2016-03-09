'use strict';

// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var playerSchema = new Schema({
    name: { type: String, required: true, unique: true },
    image_url: { type: String },
    nickname: { type: String },
    nicknames: { type: Array,  default: [
            {
                name: 'John Doe',
                category: 'default',
                rank: 0
            },{
                name: 'Bambi',
                category: 'default',
                rank: 0
            },{
                name: 'Ned Flanders',
                category: 'default',
                rank: 0
            }
        ] 
    },

    games: { type: Number, default: 0 },
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    at_bats: { type: Number, default: 0 },
    hits: { type: Number, default: 0 },
    homeruns: { type: Number, default: 0 },
    walks: { type: Number, default: 0 },
    throws: { type: Number, default: 0 },
    strikes: { type: Number, default: 0 },
    strikeouts: { type: Number, default: 0 },
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

        //
        player.nicknames = getNicknames(player);

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
        strikeouts: player.strikeouts,
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

function getNicknames(player) {

    var nicknames = [{
            name: 'John Doe',
            category: 'default',
            rank: 0
        },{
            name: 'Bambi',
            category: 'default',
            rank: 0
        },{
            name: 'Ned Flanders',
            category: 'default',
            rank: 0
        }
    ];
    
    // determine pitcher_rank
    var pitcher_rank = 0;
    if (player.strike_perc >= 0.7) {
        pitcher_rank = 3;
    } else if (player.strike_perc >= 0.5) {
        pitcher_rank = 2;
    } else if (player.strike_perc >= 0.4) {
        pitcher_rank = 1;
    }
    //console.log(player.strike_perc, pitcher_rank);

    // determine winner rank
    var winner_rank = 0;
    if (player.win_perc >= 0.85) {
        winner_rank = 3;
    } else if (player.win_perc >= 0.70) {
        winner_rank = 2;
    } else if (player.win_perc >= 0.5) {
        winner_rank = 1;
    }
    //console.log(player.win_perc, winner_rank);

    // determine batter_rank
    var batter_rank = 0;
    if (player.hit_perc >= 0.5) { 
        batter_rank = 3;
    } else if (player.hit_perc >= 0.35) {
        batter_rank = 2;
    } else if (player.hit_perc >= 0.25) {
        batter_rank = 1;
    }
    //console.log(player.hit_perc, batter_rank);
    
    // determine def_rank
    var def_rank = 0;
    if (player.def_per_game >= 3) { 
        def_rank = 3;
    } else if (player.def_per_game >= 2) {
        def_rank = 2;
    } else if (player.def_per_game >= 1.5) {
        def_rank = 1;
    }
    //console.log(player.hit_perc, batter_rank);
    
    // get ultimate_rank
    var ultimate_rank = 0;
    if (def_rank === 3) { 
        ultimate_rank += 1;

    } if (pitcher_rank === 3) { 
        ultimate_rank += 1;
    
    } if (batter_rank === 3) { 
        ultimate_rank += 1;
    
    } if (winner_rank === 3) { 
        ultimate_rank += 1;
    } 


    // determine games played
    // nicknames for players with most games

    var nicknames_db = [
        // batting
        {
            name: "Mola Adebisi",
            category: "batter",
            rank: 1
        },{
            name: "Hardwood",
            category: "batter",
            rank: 2
        },{
            name: "Thor",
            category: "batter",
            rank: 3
        },{
            name: "Big Papi",
            category: "batter",
            rank: 3
        },

        // pitching
        {
            name: "Average Pitcher",
            category: "pitcher",
            rank: 1
        },{
            name: "Bullet",
            category: "pitcher",
            rank: 2
        },{
            name: "Big Pitcher",
            category: "pitcher",
            rank: 3
        },{
            name: "The Laser Show",
            category: "pitcher",
            rank: 3
        },

        // winning
        {
            name: "Cereal Killer",
            category: "winner",
            rank: 1
        },{
            name: "Prime Time",
            category: "winner",
            rank: 2
        },{
            name: "Sidewalk Enforcer",
            category: "winner",
            rank: 3
        },{
            name: "The One And Only",
            category: "winner",
            rank: 3
        },{
            name: "Mr. Gadget",
            category: "winner",
            rank: 3
        },

        // defense
        {
            name: "The Dude",
            category: "defender",
            rank: 1
        },{
            name: "The Refrigerator",
            category: "defender",
            rank: 2
        },{
            name: "The China Wall",  // Stonewall
            category: "defender",
            rank: 3
        },{
            name: "Steel Curtain",
            category: "defender",
            rank: 3
        },

        // ultimate
        {
            name: "Big Papi",
            category: "ultimate",
            rank: 4
        },{
            name: "Megatron",
            category: "ultimate",
            rank: 4
        },{
            name: "Crash Override",
            category: "ultimate",
            rank: 4
        }
    ];

    // select by category and rank
    for (var key in nicknames_db) {
        var nickname = nicknames_db[key];

        if (player.games > 5) {  // only applies when more than 5 games are player
            if (nickname.category === "winner") {
                if (nickname.rank <= winner_rank) {
                    // add label
                    nickname.label = " --- Rank" + nickname.rank;// + " Winner";
                    nicknames.push(nickname);
                }
            } else if (nickname.category === "batter") {
                if (nickname.rank <= batter_rank) {
                    nickname.label = " --- Rank" + nickname.rank;// + " Hitter";
                    nicknames.push(nickname);
                }
            } else if (nickname.category === "pitcher") {
                if (nickname.rank <= pitcher_rank) {
                    nickname.label = " --- Rank" + nickname.rank;// + " Pitcher";
                    nicknames.push(nickname);
                }
            } else if (nickname.category === "defender") {
                if (nickname.rank <= def_rank) {
                    nickname.label = " --- Rank" + nickname.rank;// + " Defender";
                    nicknames.push(nickname);
                }
            } else if (nickname.category === "ultimate") {
                if (ultimate_rank >= 3) {
                    nickname.label = " --- Rank" + nickname.rank;// + " Defender";
                    nicknames.push(nickname);
                } 
            }
        }
    }

    // bonus
    if (ultimate_rank === 4) {
        nicknames.push({
            name: "Nicolas Cage",
            category: "ultimate",
            rank: 4
        });
    }


    return nicknames;
}
