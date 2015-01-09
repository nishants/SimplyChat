(function () {
  'use strict';
  schat.app.service('session', function () {
    var onlineUsers;

    return {
      onlineUsers: function () {
        return onlineUsers;
      },

      login: function (user, onLogin) {
        var query = "username=" + user.username;
        var socket = io.connect('http://localhost:3000', {query: query});
        socket.on('welcome', function (response) {
          onlineUsers = response.onlineUsers
          onLogin()
        });
      }
    };
  });
}).call(this);