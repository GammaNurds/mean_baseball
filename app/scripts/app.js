'use strict';

/**
 * @ngdoc overview
 * @name baseballAngularApp
 * @description
 * # baseballAngularApp
 *
 * Main module of the application.
 */
angular
    .module('baseballAngularApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch'
      ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: './views/main.html',  // put everthing in here to start
                controller: 'MainCtrl',
                controllerAs: 'main'
              })

            .when('/database', {
                templateUrl: './views/database.html',
                controller: 'DatabaseCtrl',
                controllerAs: 'database'
            })
            .otherwise({
                redirectTo: '/'
            });
});
