var UserSession = function(userSocket, user){
  this.userSocket = userSocket  ;
  this.socketUser = user;

  var invitedUser = function (invitation) {
    return invitation.to.username;
  };

  var invitingUser = function (invitation) {
    return invitation.from.username;
  };

  var inviteUser = function (socket) {
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

  userSocket.on('invite-user', inviteUser(userSocket));
};

UserSession.prototype.socket = function () {
  return this.userSocket;
};

UserSession.prototype.send = function (message) {
  this.userSocket.emit(message.name, message.body);
};

UserSession.prototype.user = function () {
  return this.socketUser;
};

UserSession.prototype.sameAs = function (that) {
  return this.socketUser.username == that.socketUser.username;
};

module.exports = UserSession;