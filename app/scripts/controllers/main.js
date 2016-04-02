'use strict';

/**
 * @ngdoc function
 * @name baseballAngularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the baseballAngularApp
 */
angular.module('baseballAngularApp')
    .controller('MainCtrl', function ($scope, $http, $routeParams, $PlayersService, $GamesService) {

        playIntro();
        console.log("load mainctrl");
        $scope.players = $PlayersService.query();
        $scope.activeGame = false;
        var player1;
        var player2;
        var game;

        var p1Obj;
        var p2Obj;

        // empty bets array that will hold the players winner choices
        $scope.bets = {};

        function updatePlayer(player, gamePlayer, winnerName) {
            player.strikes += gamePlayer.getAllStrikes();
            player.balls += gamePlayer.getAllBalls();
            player.hits += gamePlayer.getHits();
            player.homeruns += gamePlayer.getHomeruns();
            player.at_bats += gamePlayer.getAtBats();
            player.walks += gamePlayer.getWalks();
            player.defense_plays += gamePlayer.getDefensePlays();
            player.strikeouts += gamePlayer.getStrikeouts();
            
            // add game result to player 1's history
            var result;
            if (player.name === winnerName) {
                result = "win"; 
            } else {
                result = "loss";
            }
            var opponent;
            var gameScore = game.getScore();
            var score;
            if (player.name === player1.getName()) {  // its player 1
                opponent = player2.getName();
                score = gameScore.p1_points + ":" + gameScore.p2_points;
            } else { // its player 2
                opponent = player1.getName();
                score = gameScore.p2_points + ":" + gameScore.p1_points;
            }
            //console.log(player1.getName() + " -vs - " + player2.getName());

            player.game_history.push({
                opponent: opponent,
                result: result,
                score: score

            });
            
            // check if p1 is winner or loser
            if (player.name === winnerName) {
                player.wins += 1;
            } else {
                player.losses += 1;
            }

            // send p1
            $http.put("/api/players/" + player._id, player).success(function() {
                console.log("success updating player");
            });
        }

        function saveToDatabase() {

            var JSON = game.getResultAsJSON();
            var winner = game.getWinnerName();
            //var at_bats = game.getAtBats();

            // send game to db
            $GamesService.save(JSON, function() {
                console.log("posting game successfull!");
                $scope.success = true;
            });

            updatePlayer(p1Obj, player1, winner);
            updatePlayer(p2Obj, player2, winner);
        }

        function saveBets() {

            // check odds -> 1 point if winner has more wins than lose
            // 2 points if winner has lower points (lower ranked)
            var winner = getWinner();
            var loser = getLoser();
            var points;
            if (winner.wins >= loser.wins) {
                points = 1;
            } else {
                points = 2;
            }

            var betWinners = [];
            for (var playerName in $scope.bets) {
                var choice = $scope.bets[playerName];
                if (choice === game.getWinnerName()) {  //player picked winner correctly
                    //console.log(playerName + " has won it's bet! (" + choice + ")");
                    betWinners.push({
                        name: playerName,
                        points: points
                    });
                }
            }
            // assign to scope for use in my-gameover directive
            $scope.betWinners = betWinners;
            
            // process winners
            for (var key in betWinners) { 
                var playerName = betWinners[key].name;
                //console.log(betWinners[i]);

                // add point for winner
                var player = getPlayerByName(playerName);
                player.bet_points += 1;

                // update player
                $PlayersService.update({ id: player._id }, player, function() {
                    console.log("updating bets of players successfull");
                });
            }
        }

        function getPlayerByName(name) {
            var playerObj;
            for (var key in $scope.players) {
                if ($scope.players[key].name === name) {
                    playerObj = $scope.players[key];
                }
            }
            return playerObj;
        }

        /**
         * set allSelected to true when all needed options are selected
         */
        $scope.checkSelection = function() {
            $scope.allSelected = false;
            if ($scope.playerName1 && $scope.playerName1 && $scope.gameMode) {
                $scope.allSelected = true;
            }
        };

        $scope.onStartGameClick = function() {
            //console.log("start game!");
            $scope.activeGame = true;
            player1 = new PlayerClass($scope.playerName1);
            player2 = new PlayerClass($scope.playerName2);

            game = new GameClass(player1, player2);


            p1Obj = getPlayerByName($scope.playerName1);  // this is used to append data and update in db
            p2Obj = getPlayerByName($scope.playerName2);

            //console.log(p1Obj.name);
            //console.log(p2Obj.name);

            $scope.p1 = player1.getName();
            $scope.p2 = player2.getName();
            $scope.stats = game.getStats();

            //assignAward(p1Obj);
        };

        $scope.getWinner = function() {
            $scope.winner = game.getWinnerName();
        };

        // assign awards once
        // select player 1 to assign him an award
        function assignAward(player) {
            console.log("assign award to " + player.name);
            console.log(player._id, player.awards);
            player.awards.push({'name': 'Season 3 Champion', 'type': 'season'});
            $PlayersService.update({ id: player._id }, player, function() {
                console.log("updating award successfull");
            });
        } 

        /** 
         * game has to be over. returns entire player object
         */
        function getLoser() {
            //if game.isOver()
            var loser;
            if (p1Obj.name !== game.getWinnerName()) {
                loser = p1Obj;
            } else {
                loser = p2Obj;
            }
            return loser;
        }

        /** 
         * game has to be over. returns entire player object
         */
        function getWinner() {
            //if game.isOver()
            var winner;
            if (p1Obj.name === game.getWinnerName()) {
                winner = p1Obj;
            } else {
                winner = p2Obj;
            }
            return winner;
        }

        function playIntro() {
            playSound("intro");
        }

        // this function gets run on every play
        $scope.addPlay = function(play) {
            game.addPlay(play);
            $scope.stats = game.getStats();  // update stats
            
            if (game.isOver()) {
                console.log("game over!");
                //playSound("win");
                $scope.isOver = game.isOver();
                $scope.winner = game.getWinnerName();
                $scope.activeGame = false;
                saveToDatabase();

                saveBets();
                //window.location.href = "#/gameover"; 
            }
        };
    });
