var ChatRooms                 = require('./chat-rooms');

var UserSession = function(userSocket, user, sessions){
  this.userSocket = userSocket  ;
  this.socketUser = user;
  this.chatRoom   = null;
  var chatRooms   = new ChatRooms();

  var invitation = function () {
    return function (request) {
      var invitedUsername = request.invitation.to.username;
      var chatRoom = chatRooms.createNew(
          user,
          invitedUsername
      );
      userSocket.join(chatRoom.id());
      userSocket.emit(
          'chat-room-created',
          chatRoom
      );
      var invitedUserSession = sessions.sessionByUsername(request.invitation.to.username);
      // if invitedUserSession == null send user not online message

      var invitedBy = user;
      var   onReject = function(){
        console.log(request.invitation.to.username + " declined for "+request.chatRoom.chatRoomId)
      };
      var   onAccept = function(chatRoom){
        console.log(request.invitation.to.username + " accepted for "+chatRoom.chatRoomId)
      };
      invitedUserSession.inviteToChatRoom(chatRoom, invitedBy, onAccept, onReject);
    };
  };

  userSocket.on('invite-user', invitation());
};

UserSession.prototype.inviteToChatRoom = function (chatRoom, invitedBy, onAccept, onRejectOrTimeOut) {
  var userSocket = this.userSocket;
    userSocket.emit(
        'would you join',
        {
          chatRoom: chatRoom,
          by: invitedBy
        }
    );

    userSocket.on(
      'join chatroom',
        function (request) {
          userSocket.join(request.chatRoom.chatRoomId);
          if(chatRoom.id() == request.chatRoom.chatRoomId){
            onAccept(request.chatRoom);
          } else{
            onRejectOrTimeOut();
          }
        }
    );

    userSocket.on(
      'decline invite',
        function (request) {
          if(chatRoom.id() == request.chatRoom.id){
            onRejectOrTimeOut();
          }
        }
    );

  //setTimeout(onRejectOrTimeOut, chatInviteTimeOutInMillis);
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