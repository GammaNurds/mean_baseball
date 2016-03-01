'use strict';

/**
 * @ngdoc function
 * @name baseballAngularApp.controller:PlayerctrlCtrl
 * @description
 * # PlayerctrlCtrl
 * Controller of the baseballAngularApp
 */
angular.module('baseballAngularApp')
  .controller('PlayerCtrl', function ($scope, $http, $routeParams) {
  	console.log("PlayerCtrl loaded...");
    
    /**
	 * get players using api
	 */
	$scope.getPlayers = function() {
		$http.get("/api/players").success(function(response) {
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
 });
