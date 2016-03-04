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
		$scope.colours.push([{
				fillColor: "rgba(220,0,0,0.2)",
	            strokeColor: "rgba(220,220,220,1)",
	            pointColor: "rgba(220,220,220,1)",
	            pointStrokeColor: "#fff",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "rgba(220,220,220,1)"
			}]);
		$scope.colours.push([{
				fillColor: 'rgba(0,0,220,0.2)',
	            strokeColor: "rgba(220,220,220,1)",
	            pointColor: "rgba(220,220,220,1)",
	            pointStrokeColor: "#fff",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "rgba(220,220,220,1)"
			}]);
		$scope.colours.push([{
				fillColor: 'rgba(0,220,0,0.2)',
	    		strokeColor: "rgba(220,220,220,1)",
	            pointColor: "rgba(220,220,220,1)",
	            pointStrokeColor: "#fff",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "rgba(220,220,220,1)"
			}]);
		$scope.colours.push([{
				fillColor: 'rgba(0,220,220,0.2)',
	    		strokeColor: "rgba(220,220,220,1)",
	            pointColor: "rgba(220,220,220,1)",
	            pointStrokeColor: "#fff",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "rgba(220,220,220,1)"
			}]);
		$scope.colours.push([{
				fillColor: 'rgba(220,220,0,0.2)',
	    		strokeColor: "rgba(220,220,220,1)",
	            pointColor: "rgba(220,220,220,1)",
	            pointStrokeColor: "#fff",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "rgba(220,220,220,1)"
			}]);

		$scope.labels = ["Pitching", "Concentration", "Batting", "Success", "Defense", "Trash Talk"];
		for (var key in $scope.players) {
			

			var pitching = $scope.players[key].strike_perc * 100;
			var concentration = $scope.players[key].base_perc * 100;
			var batting = $scope.players[key].hit_perc * 100;
			var success = $scope.players[key].win_perc * 100;
			var defense = 50;
			var trashTalk = 100 - ($scope.players[key].win_perc * 100);
			$scope.data.push([[pitching, concentration, batting, success, defense, trashTalk]]);
		}
	}
 });
/*


color = "rgba(0,220,0,0.2)";

color = "rgba(0,220,220,0.2)";


color = "rgba(220,220,0,0.2)";
*/