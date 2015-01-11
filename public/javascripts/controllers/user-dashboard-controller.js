(function () {
  'use strict';
  schat.app.controller('UserDashboardController', function ($scope, $location, session) {
    $scope.users = session.onlineUsers();

    var onAccept = function(chatRoom){
      $location.url("/chatRoom/" + chatRoom.chatRoomId)
    };

    $scope.talkTo = function (user) {
      session.invite(user, onAccept);
    }
  });
}).call(this);