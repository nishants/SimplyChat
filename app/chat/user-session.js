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
      var   onAccept = function(){
        console.log(request.invitation.to.username + " declined for "+request.chatRoom.displayName())
      };

      invitedUserSession.inviteToChatRoom(chatRoom, invitedBy, onAccept);

      // invite other user to join socket
      // on success/failure, acknowledge the chatroom.
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
          invitedBy: invitedBy
        }
    );

    userSocket.on(
      'join chatroom',
        function (request) {
          userSocket.join(request.chatRoom.id);
          if(chatRoom.id() == request.chatRoom.id){
            onAccept();
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

  //return this.userSocket.join(chatRoom.id());
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