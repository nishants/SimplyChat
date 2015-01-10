(function () {
  'use strict';
  schat.app.controller('UserDashboardController', function ($scope, $location, session) {
    $scope.users = session.onlineUsers();

    $scope.talkTo = function (user) {
      $location.url("/chatRoom/myChatRoom")
      console.log("lets talk to " + user.username)
    }
  });
}).call(this);