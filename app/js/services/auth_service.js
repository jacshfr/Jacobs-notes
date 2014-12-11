'use strict';

/*jshint sub:true*/

module.exports = function(app) {
  app.factory('Auth', ['$location', '$cookies', function($location, $cookies) {
    return function() {
      return {
        signOut: function() {
          console.log($cookies);

          delete $cookies['jwt'];
          return $location.path('/users');
        }
      };
    };
  }]);
};
