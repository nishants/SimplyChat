var welcomeMessage= require('./messages/welcome-user');
var ServerSocket  = require('./server-socket');
var UserSessions  = require('./user-sessions')();
var Users         = require('../models/users');
var http          = require('http');
var io            = require('socket.io');

var ChatServer = function (sockets) {
  var userOf = function (userSocket) {
    return Users.findByUsername(userSocket.handshake.query.username);
  };


  var createUserSession = function (userSocket) {
    var userSession = UserSessions.createNew(
        userSocket,
        userOf(userSocket)
    );

    userSession.send(
        welcomeMessage(userSession.user(),
                       UserSessions.peersOf(userSession))
    );
  };

  sockets.onConnection(createUserSession);
};

module.exports = function (app, port) {
  var server = http.createServer(app);
  server.listen(port);
  var sio = io.listen(server);
  return new ChatServer(new ServerSocket(sio.sockets));
};