(function () {
  'use strict';
  schat.app.service('session', function ($rootScope) {
    var onlineUsers;

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
        var socket = io.connect('http://localhost:3000', {query: query});
        socket.on('welcome', function (response) {
          onlineUsers = response.onlineUsers;
          onLogin(response.welcome);
        });
      }
    };
  });
}).call(this);