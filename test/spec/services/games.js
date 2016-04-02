'use strict';

describe('Service: games', function () {

  // load the service's module
  beforeEach(module('baseballAngularApp'));

  // instantiate service
  var games;
  beforeEach(inject(function (_games_) {
    games = _games_;
  }));

  it('should do something', function () {
    expect(!!games).toBe(true);
  });

});
