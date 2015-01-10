(function () {
  'use strict';
  schat.app.service('session', function ($rootScope) {
    var onlineUsers;
    var serverSocket;
    return {
      onlineUsers: function () {
        return onlineUsers;
      },

      chatRoomById: function (id, onSuccess) {
        var chatRoom = {
          displayName: "Insanes",
          id: id,
          users: [{
            username: 'ChatBoss',
            status: "online",
            profile_img: "images/office.jpg"
          }],
          broadcast: function (message, onSuccess) {
            onSuccess({result: "message sent"});
          },
          onMessageReceived: function(callback){
            for(var i =0; i< 2; i++){
              setTimeout(callback("message: "+i), 1000);
            }
          }
        };

        onSuccess(chatRoom);
      },

      login: function (user, onLogin) {
        var query = "username=" + user.username;
        serverSocket = io.connect('http://localhost:3000', {query: query})
        serverSocket.on('welcome', function (response) {
          onlineUsers = response.onlineUsers;
          onLogin(response.welcome);
        });
      },
      invite: function(user, joinChatRoom){
        var invitation = {
          from : {username: $rootScope.currentUser.username},
          to   : {username: user.username}
        };
        serverSocket.emit('invite-user', {invitation: invitation});
        serverSocket.on('chat-room-created', function (response) {
          joinChatRoom(response.chatRoomId);
        });
      }
    };
  });
}).call(this);