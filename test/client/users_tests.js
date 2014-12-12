'use strict';

require('../../app/js/users/controllers/users_controller');
require('angular-mocks');

describe('resource service', function() {
  beforeEach(angular.mock.module('notesApp'));
  var $controllerConstructor;
  var $httpBackend;
  var $scope;
  var jwt = {'jwt': '1'};

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $controllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var userController = $controllerConstructor('UsersCtrl', {$scope: $scope});
    expect(typeof userController).toBe('object');
  });

  describe('rest request', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
    $httpBackend = _$httpBackend_;
    $controllerConstructor('UsersCtrl', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a GET request to users', function() {
      $httpBackend.expectGET('/api/users').respond(200, jwt);
      $scope.user = {
        email: 'test@example.com',
        password: 'testtest'
      };
      $scope.signIn();
      $httpBackend.flush();

      expect($scope.message).toEqual('success');

    });

    it('should make a POST request to users', function() {
      $httpBackend.expectPOST('/api/users').respond(200, jwt);
      $scope.newUser = {
        email: 'test@example.com',
        password: 'testtest',
        passwordConfirmation: 'testtest'
      };
      $scope.signUp();
      $httpBackend.flush();

      expect($scope.message).toEqual('success');

    });
  });
});
