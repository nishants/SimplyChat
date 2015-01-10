var UserSession = function(userSocket, chatRoom, username){
  this.userSocket = userSocket;
  this.chatroom   = chatRoom;
  this.username   = username;
};

UserSession.prototype.close = function () {

};

UserSession.prototype.sendMessage = function () {

};

UserSession.prototype.invite = function (sender, chatRoom) {

};

module.exports = UserSession;