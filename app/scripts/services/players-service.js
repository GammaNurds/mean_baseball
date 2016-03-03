'use strict';

/**
 * @ngdoc service
 * @name baseballAngularApp.PlayersService
 * @description
 * # PlayersService
 * Service in the baseballAngularApp.
 */
angular.module('baseballAngularApp')
	.factory('$PlayersService', function($http) {
	    // AngularJS will instantiate a singleton by calling "new" on this function
	    var service = {};
	    service.get = function() {
	    	$http.get("/api/players/").success(function(response) {
				service.players = response;
		    });
	    };
		
		service.get();
		return service;
  	});
