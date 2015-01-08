(function() {
  'use strict';
  schat.app.controller('UserDashboardController', function($scope, $location) {
    $scope.users = [
      {
        username: "nishant",
        profile_img: "images/office.jpg",
        status: "Busy"
      },
      {
        username: "babloo",
        profile_img: "images/office.jpg",
        status: "Wella"
      }
    ];

    $scope.talkTo = function(user) {
      $location.url("/login")
      console.log("lets talk to " + user.username)
    }
  });
}).call(this);