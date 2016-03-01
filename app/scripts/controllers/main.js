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

  		$scope.players = [
  			{
  				name: "Axel"
  			},{
  				name: "Florian"
  			},{
  				name: "Matthias"
  			},{
  				name: "Martin"
  			}
  		];
  		//$scope.winner = game.isOver();

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

	  			$http.post("/api/games", JSON).success(function(response) {
		            console.log("success!");
                    $scope.success = true;
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

			$scope.p1 = player1.getName();
			$scope.p2 = player2.getName();
  			$scope.stats = game.getStats();
  		};
	});
