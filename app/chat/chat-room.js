
var ChatRoom = function (id, owner, displayName) {
  this.chatRoomId = id;
  this.owner = owner;
  this.name = displayName;
};

ChatRoom.prototype.displayName = function () {
  return this.name;
};
ChatRoom.prototype.id = function () {
  return this.chatRoomId;
};

module.exports = function(id, websocket){
  return new ChatRoom(id, websocket);
};
