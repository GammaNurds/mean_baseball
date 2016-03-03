'use strict';

/**
 * @ngdoc function
 * @name baseballAngularApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the baseballAngularApp
 */
angular.module('baseballAngularApp')
  	.controller('StandingsCtrl', function ($scope, $http) {
  		// vielleicht muss man ng-init nutzen damit es spontan geladen wird!
  		//$scope.players = $PlayersService.players;
  		
	    $scope.getPlayers = function() {
	    	$http.get("/api/players/").success(function(response) {
				$scope.players = response;
			});
	    };
  	});
