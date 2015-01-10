var UserSession = function(userSocket, user){
  this.userSocket = userSocket  ;
  this.socketUser = user;
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