'use strict';

/*jshint sub:true*/

module.exports = function(app) {
  app.factory('Auth', ['$location', function($location) {
    return function() {
      return {
        signOut: function($cookies) {

          delete $cookies.jwt;
          return $location.path('/users');
        }
      };
    };
  }]);
};
