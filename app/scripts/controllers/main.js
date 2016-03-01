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
		//var GameClass = module.exports;
		var player1 = new PlayerClass("Axel");
		var player2 = new PlayerClass("Florian");

		var game = new GameClass(player1, player2);

		$scope.p1 = player1.getName();
		$scope.p2 = player2.getName();
  		$scope.stats = game.getStats();
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

	  			// disable buttons

	  		}
  		}
  		

	});


