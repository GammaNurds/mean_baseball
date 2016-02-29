"use strict";

angular.module("baseballAngularApp").directive("baseballDatabasePanel", function($location, $modal) {
	return {
		templateUrl: "views/templates/database-panel.html",
		restrict: "E",
		scope: {},

		// full scope variable
		link: function($scope) {
			$scope.games = ["game1", "game2"];
		}
	};
});