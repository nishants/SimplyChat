(function () {
  'use strict';
  schat.app.controller('UserDashboardController', function ($scope, $location, session) {
    $scope.users = session.onlineUsers();

    var onAccept = function(chatRoom){
      $location.url("/chatRoom/" + chatRoom.chatRoomId)
    };

    var onJoiningChatRoom = function(chatRoom){
      $location.url("/chatRoom/" + chatRoom.chatRoomId)
    };

    $scope.talkTo = function (user) {
      session.invite(user, onAccept);
    };

    var acceptInvite = function(invitation){
      session.joinChatRoom(invitation.chatRoom);
      onJoiningChatRoom(invitation.chatRoom);
      };

    var onChatInvite = function(invitation){
      var message = invitation.by.username + " has invited to " + invitation.chatRoom.chatRoomId+'. Join ?';
      if(confirm(message)){
        acceptInvite(invitation);
      }
    };
    session.onChatInvite(onChatInvite);

  });
}).call(this);
