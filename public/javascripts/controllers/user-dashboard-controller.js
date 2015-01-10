(function () {
  'use strict';
  schat.app.controller('UserDashboardController', function ($scope, $location, session) {
    $scope.users = session.onlineUsers();

    var onAccept = function(chatRoomId){
      $location.url("/chatRoom/" + chatRoomId)
    };

    $scope.talkTo = function (user) {
      session.invite(user, onAccept);
    }
  });
}).call(this);