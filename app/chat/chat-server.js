var welcome       = require('./messages/welcome-user');
var serverSocket  = require('./server-socket');

var ChatServer = function (websocket) {
  var userSockets = new HashMap();

  var addUserFor = function (socket) {
    userSockets.set(socket, userFor(socket));
  };

  var userFor = function (socket) {
    return {
      username: socket.handshake.query.username,
      status: "online",
      profile_img: "images/office.jpg"
    };
  };

  var socketFor = function (username) {
    for (var socket in userSockets) {
      var user = userSockets.get(socket);
      if (user != null && user.username.equal(username)) return socket;
    }
    return null;
  };

  var invitedUser = function(invitation){
    return invitation.to.username;
  };

  var invitingUser = function(invitation){
    return invitation.from.username;
  };

  var inviteUser = function(socket){
    return function (request) {
      console.log(invitedUser(request.invitation) + " is invited by " + invitingUser(request.invitation))
      socket.emit(
          'chat-room-created',
          {
            id: "myChatRoom",
            users: [],
            displayName: invitedUser(request.invitation)
          }
      );
    };
  };

  var registerUser = function (socket) {
    if (socketFor(userFor(socket).username) == null) {
      socket.emit(
          'welcome',
          welcome(userFor(socket), userSockets.values())
      );
      addUserFor(socket);
      socket.on('invite-user', inviteUser(socket));
    }
  };

  websocket.on('connection', registerUser);
};

module.exports = function (app, port) {
  return new ChatServer(serverSocket(app, port));
};