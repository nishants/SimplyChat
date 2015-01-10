var welcomeMessage       = require('./messages/welcome-user');
var serverSocket  = require('./server-socket');
var userSessions  = require('./user-sessions')();
var Users         = require('../models/users');

var ChatServer = function (serverSocket) {
  var userFor = function (socket) {
    return Users.findByUsername(socket.handshake.query.username);
  };

  var createUserSession = function (socket) {
    var userSession = userSessions.createNew(
        socket,
        userFor(socket)
    );

    userSession.send(
        welcomeMessage(userSession.user(),
                       userSessions.peersOf(userSession))
    );
  };

  serverSocket.on('connection', createUserSession);
};

module.exports = function (app, port) {
  return new ChatServer(serverSocket(app, port));
};