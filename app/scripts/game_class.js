'use strict';

var PlayerClass = function(name) {
    var strikes = 0;
    var balls = 0;
    var points = 0;

    this.getName = function() {
        return name;
    };

    this.getStrikes = function() {
        return strikes;
    };
    
    this.setStrikes = function(number) {
        strikes = number;
    };

    this.addStrike = function() {
        strikes += 1;
    };

    this.getBalls = function() {
        return balls;
    };

    this.setBalls = function(number) {
        balls = number;
    };

    this.addBall = function() {
        balls += 1;
    };

    this.getPoints = function() {
        return points;
    };

    this.addPoints = function(number) {
        points += number;
    };
};

var GameClass = function(player1, player2) {
    var MAXSTRIKES = 3;
    var MAXBALLS = 7;
    var MAXPOINTS = 3;
    
    // better than this. becauase this.pitcer would be accessible from outside
    var pitcher;
    var batter;
    var at_bat = 1;
    var plays = [];
    
    this.init = function() {
        this.setPositions();    
    };

    this.setPositions = function() {
        var oldPitcher = this.getPitcher();
        var oldBatter = this.getBatter();
        // new at-bat
        if (oldPitcher && oldBatter) { // if already set, switch positions
            this.setPitcher(oldBatter);
            this.setBatter(oldPitcher);
            at_bat += 1;
        // new game
        } else { // on init, make player1 pitcher first
            this.setPitcher(player1);
            this.setBatter(player2);
        }

        // set pitcher's balls and strikes to zero
        this.getPitcher().setBalls(0);
        this.getPitcher().setStrikes(0);
    };

    this.addPlay = function(play) {
        if (play === "strike") {
            this.getPitcher().addStrike();
            // strikeout
            if (this.getPitcher().getStrikes() >= MAXSTRIKES) {
                this.setPositions();
            }
        
        } else if (play === "ball") {
            this.getPitcher().addBall();
            // walk
            if (this.getPitcher().getBalls() >= MAXBALLS) {
                this.getBatter().addPoints(1);
                this.setPositions();
            }
        
        } else if (play === "hit") {
            this.getBatter().addPoints(1);
            this.setPositions();

        } else if (play === "homerun") {
            this.getBatter().addPoints(2);
            this.setPositions();
        } else {
            console.log("unknown action: " + play);
        }

        this.savePlay(play);
    };

    this.isOver = function() {
        var isOver = false;

        if (this.getPitcher().getPoints() >= MAXPOINTS) {
            isOver = this.getPitcher().getName();
        } else if (this.getBatter().getPoints() >= MAXPOINTS) {
            isOver = this.getBatter().getName();
        } 
        return isOver;
    };

    this.getWinnerName = function() {
        if (this.getPitcher().getPoints() >= MAXPOINTS) {
            return this.getPitcher().getName();
        } else if (this.getBatter().getPoints() >= MAXPOINTS) {
            return this.getBatter().getName();
        } 
    };    

    this.getStats = function() {
        return {
            "pitcher": this.getPitcher().getName(), 
            "batter": this.getBatter().getName(),
            "p1_points": player1.getPoints(),
            "p2_points": player2.getPoints(),
            "balls": this.getPitcher().getBalls(),
            "strikes": this.getPitcher().getStrikes(),
            "at_bats": this.getAtBats()
        };
    };

    /**
     * see models/game.js for available game object  attributes
     */ 
    this.getResultAsJSON = function() {

        var plays = this.getPlays();
        return {
            player1: player1.getName(),
            player2: player2.getName(),
            winner: this.getWinnerName(),
            plays: plays
        };
    };

    this.getPitcher = function() {
        return pitcher;
    };

    this.setPitcher = function(player) {
        pitcher = player;
    };

    this.setBatter = function(player) {
        batter = player;
    };            
    
    this.getBatter = function() {
        return batter;
    };

    this.getAtBats = function() {
        return at_bat;
    };

    this.savePlay = function(action) {
        var play = {
            pitcher: this.getPitcher().getName(),
            batter: this.getBatter().getName(),
            play: action
        };
        plays.push(play);
    };

    this.getPlays = function(play) {
        return plays;
    };

    this.init(); // run init method
};
