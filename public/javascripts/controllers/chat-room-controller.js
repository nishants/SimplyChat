(function () {
  'use strict';
  schat.app.controller('ChatRoomController', function ($scope, $location,$rootScope,  $stateParams, session) {
    var init = function(chatRoom){
      $scope.chatRoom = chatRoom;
      console.log("initialize view for "+chatRoom);
    };
    session.chatRoomById($stateParams.chatRoomId, init);

    $scope.history= {};
    $scope.history.messages = [
      {
        type: "sent",
        text: "Hi, Can you see my messaages ?",
        time: new Date(),
        sentBy: $rootScope.currentUser
      },
      {
        type: "received",
        text: "Yes, I see you message..How does this work ?",
        time: new Date(),
        sentBy: {
          username: 'ChatBoss',
          status: "online",
          profile_img: "images/office.jpg"
        }
      },
      {
        type: "sent",
        text: "Great !..well this is a mean machine on socket.io :-)",
        time: new Date(),
        sentBy: $rootScope.currentUser
      },
      {
        type: "received",
        text: "Hmmmm.... sounds interesting, tell me more",
        time: new Date(),
        sentBy: {
          username: 'ChatBoss',
          status: "online",
          profile_img: "images/office.jpg"
        }
      }
    ]
  });
}).call(this);