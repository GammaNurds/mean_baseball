'use strict';

/**
 * @ngdoc directive
 * @name baseballAngularApp.directive:myScoreboard
 * @description
 * # myScoreboard
 */
angular.module('baseballAngularApp')
  .directive('myScoreboard', function () {
    return {
      templateUrl: './views/templates/my-scoreboard.html',
      restrict: 'E'
    };
  });
