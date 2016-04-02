'use strict';

/**
 * @ngdoc directive
 * @name baseballAngularApp.directive:myGameInterface
 * @description
 * # myGameInterface
 */
angular.module('baseballAngularApp')
  .directive('myGameinterface', function () {
    return {
      templateUrl: './views/templates/my-gameinterface.html',
      restrict: 'E'
    };
  });
