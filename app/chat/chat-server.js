var welcomeMessage       = require('./messages/welcome-user');
var serverSocket  = require('./server-socket');
var userSessions  = require('./user-sessions')();

var ChatServer = function (websocket) {
  var userFor = function (socket) {
    return {
      username: socket.handshake.query.username,
      status: "online",
      profile_img: "images/office.jpg"
    };
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

  websocket.on('connection', createUserSession);
};

module.exports = function (app, port) {
  return new ChatServer(serverSocket(app, port));
};