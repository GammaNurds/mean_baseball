'use strict';

describe('Controller: PlayerctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('baseballAngularApp'));

  var PlayerctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PlayerctrlCtrl = $controller('PlayerctrlCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PlayerctrlCtrl.awesomeThings.length).toBe(3);
  });
});
