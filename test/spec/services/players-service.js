'use strict';

describe('Service: PlayersService', function () {

  // load the service's module
  beforeEach(module('baseballAngularApp'));

  // instantiate service
  var PlayersService;
  beforeEach(inject(function (_PlayersService_) {
    PlayersService = _PlayersService_;
  }));

  it('should do something', function () {
    expect(!!PlayersService).toBe(true);
  });

});
