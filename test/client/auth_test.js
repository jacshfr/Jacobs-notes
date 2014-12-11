'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('NotesController', function() {
  var $controllerConstructor;
  var $scope;
  var $cookies = {jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1NDg4YTUxNDM0OTFhMzAwMDBmY2I1M2EiLCJleHBpcmUiOjE0MTg4NDYxMDAzNTh9.fTI5NkaF5cujErKLoxrPevSGZdYNO0VcitMw-i62fAY'};

  beforeEach(angular.mock.module('notesApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $controllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var notesController = $controllerConstructor('notesCtrl', {$scope: $scope});
    expect(typeof notesController).toBe('object');
  });

  describe('sign out', function() {
    beforeEach(angular.mock.inject(function() {
      $controllerConstructor('notesCtrl', {$scope: $scope, $cookies: $cookies});
    }));

    it('should sign user out', function() {
      $scope.signOut();

      expect($cookies.jwt).toBe(undefined);
    })
  });
});
