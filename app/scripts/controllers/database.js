'use strict';

/**
 * @ngdoc function
 * @name baseballAngularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the baseballAngularApp
 */
angular.module('baseballAngularApp')
	.controller('DatabaseCtrl', [function ($scope, $http) {

		/**
		 * get games using api
		 */
		/*$scope.getGames = function() {
			$http.get("/api/games").success(function(response) {
				$scope.games = response;
	       	});
		};*/
		$scope.games = ["game1", "game2"];
		
	}]);