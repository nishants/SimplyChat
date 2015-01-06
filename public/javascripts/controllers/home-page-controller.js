(function() {
  'use strict';
  schat.app.controller('HomePageController', function($scope, $location) {
    $scope.redirectToLogin = function() {
      $location.url("/login")
    }
  });
}).call(this);