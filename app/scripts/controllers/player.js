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
			createChartData();
		});
    };

	/**
	 * get player by ID using api
	 */
	$scope.getPlayer = function() {
		var id = $routeParams.id;  // get id from url
		$http.get("/api/players/" + id).success(function(response) {
			$scope.player = response;
			$scope.player = appendCategories($scope.player);
			//console.log($scope.player);
       	});
	};

	$scope.addPlayer = function() {
		if (!$scope.player.image_url) {
			$scope.player.image_url = "http://31.media.tumblr.com/tumblr_kwhtgyYpgd1qzscuuo1_400.jpg";
		}
		$http.post("/api/players/", $scope.player).success(function(response) {
			window.location.href = "#/players";
       	});
	};

	$scope.updatePlayer = function() {
		// remove label
		$scope.player.nickname = $scope.player.nickname.split(" ---")[0];

		if (!$scope.player.image_url) {
			$scope.player.image_url = "http://31.media.tumblr.com/tumblr_kwhtgyYpgd1qzscuuo1_400.jpg";
		}
		$http.put("/api/players/" + $scope.player._id, $scope.player).success(function() {
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

	function createChartData() {
		$scope.data = [];
		$scope.colours = [];
		var colorList = [
			"rgba(220,0,0,0.2)",
			"rgba(0,220,0,0.2)",
			"rgba(0,0,220,0.2)",
			"rgba(220,220,0,0.2)",
			"rgba(0,220,220,0.2)",
			"rgba(220,0,220,0.2)"
		];

		for (var i = 0; i < colorList.length; i++) {
			$scope.colours.push([{
				fillColor: colorList[i],
	            strokeColor: "rgba(220,220,220,1)",
	            pointColor: "rgba(220,220,220,1)",
	            pointStrokeColor: "#fff",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "rgba(220,220,220,1)"
			}]);
		}

		$scope.labels = ["Pitching", "Concentration", "Batting", "Success", "Defense", "Trash Talk"];
		for (var key in $scope.players) {
			
			var pitching = Math.round($scope.players[key].strike_perc * 100);
			var concentration = Math.round($scope.players[key].base_perc * 100);
			var batting = Math.round($scope.players[key].hit_perc * 100);
			var success = Math.round($scope.players[key].win_perc * 100);
			var defense = $scope.players[key].def_per_game;
			var trashTalk = Math.round(100 - ($scope.players[key].win_perc * 100));
			$scope.data[$scope.players[key]._id] = [[pitching, concentration, batting, success, defense, trashTalk]];
			//console.log($scope.data);
		}
	}

	function appendCategories(player) {
		player.hasWinnerNames = false;
		player.hasBatterNames = false;
		player.hasPitcherNames = false;
		player.hasDefenderNames = false;
		player.hasUltimateNames = false;

		for (var key in player.nicknames) {
			var nickname = player.nicknames[key];
			if (nickname.category === "winner") {
				player.hasWinnerNames = true;
			} else if (nickname.category === "batter") {
				player.hasBatterNames = true;
			} else if (nickname.category === "pitcher") {
				player.hasPitcherNames = true;
			} else if (nickname.category === "defender") {
				player.hasDefenderNames = true;
			} else if (nickname.category === "ultimate") {
				player.hasUltimateNames = true;
			}
		}

		return player;
	}
 });
/*


color = "rgba(0,220,0,0.2)";

color = "rgba(0,220,220,0.2)";


color = "rgba(220,220,0,0.2)";
*/