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

  		// this function gets run on every play
  		function addPlay(play) {
  			game.addPlay(play);
  			$scope.stats = game.getStats();  // update stats
  			if (game.isOver()) {
	  			console.log("game over!");
	  			$scope.isOver = game.isOver();
                $scope.winner = game.getWinnerName();
	  			var JSON = game.getResultAsJSON();
	  			//$scope.winner = result.winner;

	  			// send game to db
                $http.post("/api/games", JSON).success(function(response) {
		            console.log("success!");
                    $scope.success = true;
		        });

                // get player object by id 

                // update player db
                // add games, wins, losses, throws, strikes, ...
                var name = player1.getName();
                var strikes = player1.getAllStrikes();
                var balls = player1.getAllBalls();

                


                var p1_JSON = p1Obj;
                console.log(p1_JSON);
                p1_JSON.games += 1;
                p1_JSON.strikes = 999;
                p1_JSON.balls = 999;
                //p1_JSON.strikes += strikes;
                //p1_JSON.balls += balls;

                // check if p1 is winner or loser
                if (p1_JSON.name === $scope.winner) {
                    console.log("p1 is winner!");
                    p1_JSON.wins += 1;
                } else {
                    p1_JSON.losses += 1;
                }
                console.log(p1_JSON);
                

                var p2_JSON = p2Obj;
                console.log(p2_JSON);
                p2_JSON.games += 1;
                p2_JSON.strikes = 999;
                p2_JSON.balls = 999;
                //p2_JSON.strikes += strikes;
                //p2_JSON.balls += balls;

                // check if p2 is winner or loser
                if (p2_JSON.name === $scope.winner) {
                    console.log("p2 is winner");
                    p2_JSON.wins += 1;
                } else {
                    p2_JSON.losses += 1;
                }
                console.log(p2_JSON);


                // send p1
                $http.put("/api/players/" + p1_JSON._id, p1_JSON).success(function(response) {
                    console.log("success updating player1!");
                });

                // send p2
                $http.put("/api/players/" + p2_JSON._id, p2_JSON).success(function(response) {
                    console.log("success updating player2!");
                });



	  			// disable buttons
	  		}
  		}

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
