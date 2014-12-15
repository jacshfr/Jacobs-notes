'use strict';


module.exports = function(app) {
  app.controller('UsersCtrl', ['$scope', '$http', '$cookies', '$base64', '$location', function($scope, $http, $cookies, $base64, $location) {
    $scope.errors = [];
    $scope.signIn = function() {
      $scope.errors = [];
      /*jshint sub:true*/
      $http.defaults.headers.common['Authorization'] = 'Basic ' + $base64.encode($scope.user.email + ':' + $scope.user.password);
      /*jshint sub:false*/
      $http({
        method: 'GET',
        url: '/api/users'
      })
      .success(function(data) {
        $scope.message = 'success';
        console.log($scope.message);
        $cookies.jwt = data.jwt;
        $location.path('/notes');
      })
      .error(function(data) {
        console.log('error!');
        console.log(data);
        $scope.errors.push(data);
      });
    };

    $scope.signUp = function() {
      $scope.errors = [];
      if ($scope.newUser.password !== $scope.newUser.passwordConfirmation) $scope.errors.push({msg: 'password and confirmation did not match'});
      if (!$scope.newUser.email) $scope.errors.push({msg: 'did note specify a email'});

      if ($scope.errors.length) return;
      $scope.newUser.email = $base64.encode($scope.newUser.email);
      $scope.newUser.password = $base64.encode($scope.newUser.password);
      $scope.newUser.passwordConfirmation = $base64.encode($scope.newUser.passwordConfirmation);
      $http({
        method: 'POST',
        url: '/api/users',
        data: $scope.newUser
      })
      .success(function(data) {
        $scope.message = 'success';
        console.log($scope.message);
        $cookies.jwt = data.jwt;
        $location.path('/notes');
      })
      .error(function(data) {
        console.log(data);
        $scope.errors.push(data);
      });
    };
  }]);
};
