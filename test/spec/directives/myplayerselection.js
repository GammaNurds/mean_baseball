'use strict';

describe('Directive: myPlayerselection', function () {

  // load the directive's module
  beforeEach(module('baseballAngularApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<my-playerselection></my-playerselection>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the myPlayerselection directive');
  }));
});
