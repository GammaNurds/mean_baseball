'use strict';

/**
 * @ngdoc directive
 * @name baseballAngularApp.directive:myPlayerselection
 * @description
 * # myPlayerselection
 */
angular.module('baseballAngularApp')
  .directive('myPlayerselection', function () {
    return {
      templateUrl: './views/templates/my-playerselection.html',
      restrict: 'E'
    };
  });
