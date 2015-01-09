var welcome = require('./messages/welcome-user');

var chatServer = function (websocket) {
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

  var registerUser = function (socket) {
    if (socketFor(userFor(socket).username) == null) {
      socket.emit(
          'welcome',
          welcome(userFor(socket), userSockets.values())
      );
      addUserFor(socket);
    }

    // Create chatroom(user, chatroom)
    // Send invitation to a user(chatroom, userOne , userTwo)
    // log off(user)
    //close chatroom(chatroom)
    // set status
  };

  websocket.on('connection', registerUser);
};

module.exports = chatServer;