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
        'ngTouch',
        'chart.js'
      ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: './views/main.html',  // put everthing in here to start
                controller: 'MainCtrl'
            })
            .when('/games', {
                templateUrl: './views/database.html',
                controller: 'DatabaseCtrl'
            })
            .when('/games/details/:id', {
                templateUrl: './views/database_details.html',
                controller: 'DatabaseCtrl'
            })
            .when('/players', {
                templateUrl: './views/players.html',
                controller: 'PlayerCtrl'
            })
            .when('/players/add', {
                templateUrl: './views/add_player.html',
                controller: 'PlayerCtrl'
            })
            .when('/players/edit/:id', {
                templateUrl: './views/edit_player.html',
                controller: 'PlayerCtrl'
            })
            .when('/standings', {
                templateUrl: './views/standings.html',
                controller: 'StandingsCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
});
