'use strict';

/**
 * @ngdoc function
 * @name baseballAngularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the baseballAngularApp
 */
angular.module('baseballAngularApp')
	.controller('MainCtrl', function ($scope, $http, $routeParams) {
		
		$scope.activeGame = false;
		var player1;
		var player2;
		var game;

        var p1Obj;
        var p2Obj;

  		//$scope.winner = game.isOver();
        //$scope.players = $PlayersService.players;
        $scope.getPlayers = function() {
            $http.get("/api/players/").success(function(response) {
                $scope.players = response;
            });
        };

  		// handler for ball button
  		$scope.onBallClick = function() {
  			addPlay("ball");
  		};

  		// handler for ball button
  		$scope.onStrikeClick = function() {
  			addPlay("strike");
  		};

  		// handler for ball button
  		$scope.onHitClick = function() {
  			addPlay("hit");
  		};

  		 // handler for ball button
  		$scope.onHomerunClick = function() {
  			addPlay("homerun");
  		};

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
            console.log("start game!");
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
        };

  		// this function gets run on every play
  		function addPlay(play) {
  			game.addPlay(play);
  			$scope.stats = game.getStats();  // update stats
  			if (game.isOver()) {
	  			console.log("game over!");
	  			$scope.isOver = game.isOver();
                $scope.winner = game.getWinnerName();

                if ($scope.gameMode === "Ranked Match") {
                    saveToDatabase();   
                }
                // dont send results for practice games
	  		}
  		}

        function saveToDatabase() {

            var JSON = game.getResultAsJSON();
            var winner = game.getWinnerName();
            var at_bats = game.getAtBats() - 1;

            // send game to db
            $http.post("/api/games", JSON).success(function(response) {
                console.log("posting game successfull!");
                $scope.success = true;
            });

            // update player db

            p1Obj.strikes += player1.getAllStrikes();
            p1Obj.balls += player1.getAllBalls();
            p1Obj.hits += player1.getHits();
            p1Obj.homeruns += player1.getHomeruns();
            p1Obj.at_bats += at_bats;
            console.log("p1 walks before: " +  p1Obj.walks);
            p1Obj.walks += player1.getWalks();
            console.log("p1 walks after: " +  p1Obj.walks);


            // check if p1 is winner or loser
            if (p1Obj.name === winner) {
                console.log("p1 is winner!");
                p1Obj.wins += 1;
            } else {
                p1Obj.losses += 1;
            }

            p2Obj.strikes += player2.getAllStrikes();
            p2Obj.balls += player2.getAllBalls();
            p2Obj.hits += player2.getHits();
            p2Obj.homeruns += player2.getHomeruns();
            p2Obj.at_bats += at_bats;
            p2Obj.walks += player2.getWalks();
            console.log("p2 walks: " + player2.getWalks());

            // check if p2 is winner or loser
            if (p2Obj.name === winner) {
                p2Obj.wins += 1;
            } else {
                p2Obj.losses += 1;
            }


            // send p1
            $http.put("/api/players/" + p1Obj._id, p1Obj).success(function(response) {
                console.log("success updating player1!");
            });

            // send p2
            $http.put("/api/players/" + p2Obj._id, p2Obj).success(function(response) {
                console.log("success updating player2!");
            });
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

	});
