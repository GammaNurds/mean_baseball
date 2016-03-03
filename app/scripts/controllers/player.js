'use strict';

/**
 * @ngdoc function
 * @name baseballAngularApp.controller:PlayerctrlCtrl
 * @description
 * # PlayerctrlCtrl
 * Controller of the baseballAngularApp
 */
angular.module('baseballAngularApp')
  .controller('PlayerCtrl', function ($scope, $http, $routeParams, $PlayersService) {
  	console.log("PlayerCtrl loaded...");

    //$scope.players = $PlayersService.players;
    $scope.getPlayers = function() {
    	$http.get("/api/players/").success(function(response) {
			$scope.players = response;
		});
    };

	/**
	 * get player by ID using api
	 */
	$scope.getPlayer = function() {
		var id = $routeParams.id;  // get id from url
		$http.get("/api/players/" + id).success(function(response) {
			$scope.player = response;
       	});
	};

	$scope.addPlayer = function() {
		if (!$scope.player.image_url) {
			console.log("no image - assign batman!");
			$scope.player.image_url = "http://31.media.tumblr.com/tumblr_kwhtgyYpgd1qzscuuo1_400.jpg";
		}
		$http.post("/api/players/", $scope.player).success(function(response) {
			window.location.href = "#/players";
       	});
	};

	/**
	 * remove game by ID when button "Delete" is clicked
	 */ 
	$scope.onDeleteClick = function(id) {
		$http.delete("/api/players/" + id).success(function() {
			window.location.href = "#/players";
       	});
	};

 });
