(function() {
  'use strict';
  schat.app.controller('LoginPageController', function($scope, $location, $rootScope, session) {
    var onLogin = function(loggedInUser){
      $rootScope.currentUser = loggedInUser;
      $location.url("/login")
    };

    $scope.login = function() {
      session.login($scope.user, onLogin)
    }
  });
}).call(this);