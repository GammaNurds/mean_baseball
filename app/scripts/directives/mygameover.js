'use strict';

/**
 * @ngdoc directive
 * @name baseballAngularApp.directive:myGameover
 * @description
 * # myGameover
 */
angular.module('baseballAngularApp')
  .directive('myGameover', function () {
    return {
      templateUrl: './views/templates/my-gameover.html',
      restrict: 'E'
    };
  });
