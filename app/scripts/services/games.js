'use strict';

/**
 * @ngdoc service
 * @name baseballAngularApp.games
 * @description
 * # games
 * Service in the baseballAngularApp.
 */
angular.module('baseballAngularApp')
  .factory('$GamesService', function($resource) {     
        return $resource("/api/games/:id", null, 
            {
                'update': { method: 'PUT' }
            });
    });
