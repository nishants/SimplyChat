
var ChatRoom = function (id, websocket) {
  this.id = id;
  this.websocket = socket;
  this.userSessions = [];
  this.displayName = null;
};

ChatRoom.prototype.sessionByUsername = function (username) {

};

ChatRoom.prototype.introduceUser = function (user) {

};

ChatRoom.prototype.broadcast = function (user) {

};

module.exports = function(id, websocket){
  return new ChatRoom(id, websocket);
};