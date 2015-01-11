var ChatRoom = require('./chat-room');

var ChatRooms = function () {
  this.chatrooms = [];
};

ChatRooms.prototype.createNew = function (owner, displayName) {
  var id = "myChatroom";
  return new ChatRoom(id, owner, displayName);
};

module.exports = ChatRooms;