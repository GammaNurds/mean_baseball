'use strict';

/**
 * @ngdoc service
 * @name baseballAngularApp.PlayersService
 * @description
 * # PlayersService
 * Service in the baseballAngularApp.
 */
angular.module('baseballAngularApp')
	.factory('$PlayersService', function($resource) {		
		return $resource("/api/players/:id", null, 
			{
				'update': { method: 'PUT' }
			});
  	});


/* default ::
{ 'get':    {method:'GET'},
  'save':   {method:'POST'},
  'query':  {method:'GET', isArray:true},    // get all
  'remove': {method:'DELETE'},
  'delete': {method:'DELETE'} };
  */

  /* how to use update:
  fileService.update({ id: id }, {
      markdown: markdown
  });

  */
