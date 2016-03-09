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


        console.log("trying to play sound!");
        /*var sound = new Howl({
            src: ['.../sounds/homerun3.mp3'],
            autoplay: true,
            loop: true,
            onend: function() {
                console.log('Finished!');
            }
        });
        console.log(sound);
        sound.play();

        playSound("strike");
        */
		
		$scope.activeGame = false;
		var player1;
		var player2;
		var game;

        var p1Obj;
        var p2Obj;

        function updatePlayer(player, gamePlayer, winnerName) {
            player.strikes += gamePlayer.getAllStrikes();
            player.balls += gamePlayer.getAllBalls();
            player.hits += gamePlayer.getHits();
            player.homeruns += gamePlayer.getHomeruns();
            player.at_bats += gamePlayer.getAtBats();
            player.walks += gamePlayer.getWalks();
            player.defense_plays += gamePlayer.getDefensePlays();
            player.strikeouts += gamePlayer.getStrikeouts();
            
            // check if p1 is winner or loser
            if (player.name === winnerName) {
                player.wins += 1;
            } else {
                player.losses += 1;
            }
            console.log(player);
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
            $http.post("/api/games", JSON).success(function(response) {
                console.log("posting game successfull!");
                $scope.success = true;
            });

            updatePlayer(p1Obj, player1, winner);
            updatePlayer(p2Obj, player2, winner);
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

        // handler for defense button
        $scope.onDefensePlayClick = function() {
            addPlay("defensePlay");
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

        $scope.getWinner = function() {
            $scope.winner = game.getWinnerName();
        };

        $scope.playIntro = function() {
            playSound("intro");
        };
  		// this function gets run on every play
  		function addPlay(play) {
  			game.addPlay(play);
  			$scope.stats = game.getStats();  // update stats
  			if (game.isOver()) {
	  			console.log("game over!");
                //playSound("win");
	  			$scope.isOver = game.isOver();
                $scope.winner = game.getWinnerName();
                saveToDatabase();
                window.location.href = "#/gameover"; 
	  		}
  		}
	});
