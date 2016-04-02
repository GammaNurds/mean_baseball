'use strict';

/**
 * @ngdoc directive
 * @name baseballAngularApp.directive:myBets
 * @description
 * # myBets
 */
angular.module('baseballAngularApp')
  .directive('myBets', function () {
    return {
      templateUrl: './views/templates/my-bets.html',
      restrict: 'E' // only allow <my-bets></my-bets>
      /*link: function postLink(scope, element, attrs) {
        element.text('this is the myBets directive');
      }*/
    };
  });
