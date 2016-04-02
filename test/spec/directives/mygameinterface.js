'use strict';

describe('Directive: myGameInterface', function () {

  // load the directive's module
  beforeEach(module('baseballAngularApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<my-game-interface></my-game-interface>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the myGameInterface directive');
  }));
});
